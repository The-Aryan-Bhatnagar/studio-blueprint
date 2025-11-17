import Navigation from "./Navigation";
import MusicPlayer from "./MusicPlayer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="ml-64 p-8">{children}</main>
      <MusicPlayer />
    </div>
  );
};

export default Layout;
