-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('user', 'artist', 'admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create artist_profiles table
CREATE TABLE public.artist_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  stage_name text NOT NULL,
  bio text,
  avatar_url text,
  cover_image_url text,
  instagram_url text,
  youtube_url text,
  spotify_url text,
  apple_music_url text,
  total_followers int DEFAULT 0,
  total_subscribers int DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.artist_profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for artist_profiles
CREATE POLICY "Anyone can view artist profiles"
  ON public.artist_profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Artists can update their own profile"
  ON public.artist_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Artists can insert their own profile"
  ON public.artist_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create songs table
CREATE TABLE public.songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid REFERENCES public.artist_profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  lyrics text,
  audio_url text NOT NULL,
  cover_image_url text,
  genre text,
  featured_artists text[],
  tags text[],
  duration int,
  category text,
  comment_limit_type text DEFAULT 'unlimited' CHECK (comment_limit_type IN ('unlimited', 'followers', 'subscribers', 'none', 'custom')),
  comment_limit_count int,
  is_scheduled boolean DEFAULT false,
  scheduled_release_at timestamptz,
  is_published boolean DEFAULT false,
  is_draft boolean DEFAULT true,
  published_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- RLS policies for songs
CREATE POLICY "Anyone can view published songs"
  ON public.songs
  FOR SELECT
  USING (is_published = true AND is_draft = false);

CREATE POLICY "Artists can view their own songs"
  ON public.songs
  FOR SELECT
  USING (artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Artists can insert their own songs"
  ON public.songs
  FOR INSERT
  WITH CHECK (artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Artists can update their own songs"
  ON public.songs
  FOR UPDATE
  USING (artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Artists can delete their own songs"
  ON public.songs
  FOR DELETE
  USING (artist_id IN (SELECT id FROM public.artist_profiles WHERE user_id = auth.uid()));

-- Create song_analytics table
CREATE TABLE public.song_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  song_id uuid REFERENCES public.songs(id) ON DELETE CASCADE NOT NULL,
  total_plays int DEFAULT 0,
  total_likes int DEFAULT 0,
  total_comments int DEFAULT 0,
  plays_last_7_days int DEFAULT 0,
  plays_last_30_days int DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(song_id)
);

ALTER TABLE public.song_analytics ENABLE ROW LEVEL SECURITY;

-- RLS policies for song_analytics
CREATE POLICY "Anyone can view analytics for published songs"
  ON public.song_analytics
  FOR SELECT
  USING (song_id IN (SELECT id FROM public.songs WHERE is_published = true));

CREATE POLICY "Artists can view analytics for their own songs"
  ON public.song_analytics
  FOR SELECT
  USING (song_id IN (
    SELECT s.id FROM public.songs s
    INNER JOIN public.artist_profiles ap ON s.artist_id = ap.id
    WHERE ap.user_id = auth.uid()
  ));

-- Create trigger to auto-create analytics entry when song is created
CREATE OR REPLACE FUNCTION public.create_song_analytics()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.song_analytics (song_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_song_created
  AFTER INSERT ON public.songs
  FOR EACH ROW
  EXECUTE FUNCTION public.create_song_analytics();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER update_artist_profiles_updated_at
  BEFORE UPDATE ON public.artist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_songs_updated_at
  BEFORE UPDATE ON public.songs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_song_analytics_updated_at
  BEFORE UPDATE ON public.song_analytics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();