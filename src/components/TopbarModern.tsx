import * as React from "react";
import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/components/ui/sidebar-modern";
import { cn } from "@/lib/utils";

interface TopbarModernProps {
  className?: string;
}

export const TopbarModern = ({ className }: TopbarModernProps) => {
  const { isCollapsed, toggleCollapsed } = useSidebar();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <header 
      className={cn(
        "h-16 bg-background border-b border-border flex items-center justify-between px-6 transition-all duration-300",
        isCollapsed ? "ml-16" : "ml-64",
        className
      )}
    >
      {/* Left Section - Menu Toggle & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapsed}
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Global Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar processos, intimações..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/30 border-muted focus:bg-background"
            />
          </div>
        </form>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-5 h-5" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
          >
            3
          </Badge>
        </Button>

        {/* User Profile */}
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};