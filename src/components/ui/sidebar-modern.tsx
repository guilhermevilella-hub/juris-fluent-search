import * as React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  FileText, 
  Bell, 
  Activity, 
  Calendar, 
  Archive, 
  Settings,
  Home,
  Search
} from "lucide-react";

// Sidebar Provider Context
interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
};

// Sidebar Provider
interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export const SidebarProvider = ({ children, defaultCollapsed = false }: SidebarProviderProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const toggleCollapsed = () => setIsCollapsed(prev => !prev);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Main Sidebar Component
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
    const { isCollapsed } = useSidebar();

    return (
      <aside
        ref={ref}
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50",
          isCollapsed ? "w-16" : "w-64",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    );
  }
);
Sidebar.displayName = "Sidebar";

// Sidebar Header
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center h-16 px-4 border-b border-sidebar-border", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

// Sidebar Content
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto py-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarContent.displayName = "SidebarContent";

// Sidebar Menu
interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn("space-y-1 px-3", className)}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
SidebarMenu.displayName = "SidebarMenu";

// Sidebar Menu Item
interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("", className)}
        {...props}
      >
        {children}
      </li>
    );
  }
);
SidebarMenuItem.displayName = "SidebarMenuItem";

// Sidebar Menu Button
interface SidebarMenuButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive?: boolean;
}

export const SidebarMenuButton = React.forwardRef<HTMLAnchorElement, SidebarMenuButtonProps>(
  ({ className, href, icon: Icon, children, isActive = false, ...props }, ref) => {
    const { isCollapsed } = useSidebar();

    return (
      <Link
        to={href}
        ref={ref}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground" 
            : "text-sidebar-foreground",
          isCollapsed && "justify-center px-2",
          className
        )}
        {...props}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!isCollapsed && <span>{children}</span>}
      </Link>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

// Pre-built navigation items
export const sidebarNavigationItems = [
  { name: "Início", href: "/dashboard", icon: Home },
  { name: "Processos", href: "/processos", icon: FileText },
  { name: "Intimações", href: "/intimacoes", icon: Bell },
  { name: "Movimentações", href: "/movimentacoes", icon: Activity },
  { name: "Agenda", href: "/agenda", icon: Calendar },
  { name: "Arquivos", href: "/arquivos", icon: Archive },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
];

// Complete Sidebar Navigation
export const SidebarNavigation = () => {
  const location = useLocation();

  return (
    <SidebarMenu>
      {sidebarNavigationItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            href={item.href}
            icon={item.icon}
            isActive={location.pathname === item.href}
          >
            {item.name}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};