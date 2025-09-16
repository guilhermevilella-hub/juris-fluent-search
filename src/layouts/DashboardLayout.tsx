import * as React from "react";
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarNavigation,
  SidebarProvider,
  useSidebar
} from "@/components/ui/sidebar-modern";
import { TopbarModern } from "@/components/TopbarModern";
import { Link } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const SidebarLogo = () => {
  const { isCollapsed } = useSidebar();

  return (
    <SidebarHeader>
      <Link to="/dashboard" className="flex items-center gap-3 group">
        <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">i</span>
        </div>
        {!isCollapsed && (
          <span className="font-bold text-xl text-primary group-hover:text-primary-hover transition-colors">
            Jus
          </span>
        )}
      </Link>
    </SidebarHeader>
  );
};

const DashboardLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar>
        <SidebarLogo />
        <SidebarContent>
          <SidebarNavigation />
        </SidebarContent>
      </Sidebar>

      {/* Main Content Area */}
      <div 
        className={`transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Topbar */}
        <TopbarModern />
        
        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultCollapsed={false}>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
  );
};