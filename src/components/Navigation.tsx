import { Home, Mic2, Calendar, Users, Search, Music, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Music, label: "Library", path: "/library" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: Calendar, label: "Events", path: "/events" },
  ];

  const artistItems = [
    { icon: Mic2, label: "Artist Profile", path: "/artist" },
    { icon: Upload, label: "Dashboard", path: "/artist/dashboard" },
  ];

  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-6 flex flex-col gap-8">
      <Link to="/" className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
          <Music className="w-6 h-6" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          MusicFlow
        </span>
      </Link>

      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
              "hover:bg-secondary",
              location.pathname === item.path
                ? "bg-secondary text-primary"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="border-t border-border pt-6 mt-auto">
        <p className="text-xs text-muted-foreground mb-3 px-4">FOR ARTISTS</p>
        <div className="flex flex-col gap-2">
          {artistItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                "hover:bg-secondary",
                location.pathname === item.path
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {!isAdminPath && (
          <div className="mt-6 pt-6 border-t border-border">
            <Link
              to="/admin/login"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-secondary text-muted-foreground text-xs"
            >
              Admin Access
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
