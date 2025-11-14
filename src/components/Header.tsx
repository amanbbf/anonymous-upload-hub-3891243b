import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Upload className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FileShare</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Instant file sharing
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              How it Works
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              About
            </Button>
            <Button variant="outline" size="sm">
              Contact
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
