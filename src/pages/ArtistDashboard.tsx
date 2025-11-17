import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Upload,
  TrendingUp,
  Music,
  Users,
  DollarSign,
  Play,
  Heart,
  Edit,
  Trash2,
  BarChart3,
  MessageCircle,
} from "lucide-react";

const ArtistDashboard = () => {
  const { toast } = useToast();
  const [songTitle, setSongTitle] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");

  const handleUploadSong = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Song Uploaded Successfully",
      description: `${songTitle} has been uploaded and is now live!`,
    });
    setSongTitle("");
    setAlbumName("");
    setGenre("");
    setLanguage("");
    setDescription("");
  };

  const uploadedSongs = [
    { id: 1, title: "Midnight Dreams", plays: 125000, likes: 8900, status: "Published" },
    { id: 2, title: "Sunset Vibes", plays: 98000, likes: 6700, status: "Published" },
    { id: 3, title: "City Lights", plays: 156000, likes: 12300, status: "Published" },
  ];

  return (
    <div className="min-h-screen pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Artist Dashboard</h1>
          <p className="text-muted-foreground">Manage your music and connect with fans</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Total Streams</span>
            <Play className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">1.2M</p>
          <p className="text-sm text-green-500 mt-1">+12% from last month</p>
        </Card>

        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Followers</span>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">45.2K</p>
          <p className="text-sm text-green-500 mt-1">+8% from last month</p>
        </Card>

        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Total Likes</span>
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">234K</p>
          <p className="text-sm text-green-500 mt-1">+15% from last month</p>
        </Card>

        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Earnings</span>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">$4,250</p>
          <p className="text-sm text-green-500 mt-1">+20% from last month</p>
        </Card>
      </div>

      {/* Dashboard Content */}
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="upload">Upload Song</TabsTrigger>
          <TabsTrigger value="songs">My Songs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card className="p-8 bg-card border-border">
            <h2 className="text-2xl font-bold mb-6">Upload New Song</h2>
            <form onSubmit={handleUploadSong} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="audio">Audio File *</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Drop your audio file or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      MP3, WAV, FLAC (Max 100MB)
                    </p>
                    <Input id="audio" type="file" accept="audio/*" className="hidden" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="thumbnail">Cover Image *</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Drop your cover image or click
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG (Min 1000x1000px)
                    </p>
                    <Input id="thumbnail" type="file" accept="image/*" className="hidden" required />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Song Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter song title"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="album">Album Name</Label>
                  <Input
                    id="album"
                    placeholder="Enter album name"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="genre">Genre *</Label>
                  <Select value={genre} onValueChange={setGenre} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hip-hop">Hip Hop</SelectItem>
                      <SelectItem value="punjabi">Punjabi Pop</SelectItem>
                      <SelectItem value="romantic">Romantic</SelectItem>
                      <SelectItem value="party">Party</SelectItem>
                      <SelectItem value="rap">Rap</SelectItem>
                      <SelectItem value="bollywood">Bollywood</SelectItem>
                      <SelectItem value="edm">EDM</SelectItem>
                      <SelectItem value="folk">Folk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language">Language *</Label>
                  <Select value={language} onValueChange={setLanguage} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punjabi">Punjabi</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell your fans about this song..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="lyrics">Lyrics (Optional)</Label>
                <Textarea
                  id="lyrics"
                  placeholder="Paste your song lyrics here..."
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow">
                <Upload className="mr-2 w-4 h-4" />
                Upload Song
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="songs">
          <Card className="p-8 bg-card border-border">
            <h2 className="text-2xl font-bold mb-6">My Songs ({uploadedSongs.length})</h2>
            <div className="space-y-4">
              {uploadedSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-5 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Music className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{song.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          {song.plays.toLocaleString()} plays
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {song.likes.toLocaleString()} likes
                        </span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs">
                          {song.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="p-8 bg-card border-border">
            <h2 className="text-2xl font-bold mb-6">Performance Analytics</h2>
            <div className="h-64 flex items-center justify-center border border-border rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Analytics chart will be displayed here
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card className="p-8 bg-card border-border">
            <h2 className="text-2xl font-bold mb-6">Fan Messages</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-secondary rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Fan {i}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Love your new track! Can't wait for more...
                    </p>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-3 h-3 mr-2" />
                      Reply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtistDashboard;
