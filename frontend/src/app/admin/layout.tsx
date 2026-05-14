"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2,
  FileEdit,
  BarChart3,
  Settings, 
  LogOut,
  ChevronDown,
  Menu,
  ChevronLeft,
  ChevronRight,
  X,
  GraduationCap,
  Bell,
  ShieldCheck,
  Building2,
  Activity,
  CreditCard,
  Layers
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Manage Students", href: "/admin/students", icon: Users },
  { name: "Manage Counsellors", href: "/admin/counsellors", icon: UserSquare2 },
  { name: "Manage Colleges", href: "/admin/colleges", icon: Building2 },
  { name: "Manage Courses", href: "/admin/courses", icon: GraduationCap },
  { name: "Manage Exams", href: "/admin/exams", icon: FileEdit },
  { name: "Manage Cut-offs", href: "/admin/cut-offs", icon: BarChart3 },
  { name: "Manage Rank", href: "/admin/rank", icon: Activity },
  { name: "Seat Matrix", href: "/admin/seat-matrix", icon: Layers },
  { name: "Live Sessions", href: "/admin/sessions", icon: Activity },
  { name: "Content Manager", href: "/admin/content", icon: FileEdit },
  { name: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white grid-bg flex flex-col md:flex-row font-inter" suppressHydrationWarning>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        bg-white border-r border-slate-200 flex-shrink-0 flex flex-col transition-all duration-300 z-50
        fixed inset-y-0 left-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 md:sticky md:top-0 md:h-screen ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        {/* Universal Toggle Button (Desktop & Mobile) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-8 bg-white border border-slate-200 rounded-full p-1 shadow-md text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all z-50 flex items-center justify-center cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Shrink Sidebar"}
          suppressHydrationWarning
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className={`p-4 border-b border-slate-100 flex items-center h-16 sticky top-0 bg-white z-10 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-slate-900">
                Admin
              </span>
            </Link>
          )}
          {isCollapsed && (
            <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
          )}

          {/* Mobile Close Button */}
          {!isCollapsed && (
            <button 
              onClick={() => setIsMobileOpen(false)} 
              className="md:hidden p-1.5 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors"
              title="Close Sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto hidden-scrollbar flex flex-col">
          <div className="px-4 py-4">
            {!isCollapsed && <p className="text-xs font-bold text-slate-400 mb-2">Admin Menu</p>}
          </div>
          <nav className={`flex-1 space-y-1 ${isCollapsed ? 'px-2' : 'px-4'}`}>
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isCollapsed ? 'justify-center px-0' : 'px-4'
                  } ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-white grid-bg hover:text-slate-900"
                  }`}
                  title={isCollapsed ? link.name : undefined}
                >
                  <link.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto'}`}>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 mt-auto border-t border-slate-100">
            <button className={`flex items-center gap-3 py-3 w-full rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors ${isCollapsed ? 'justify-center px-0' : 'px-4'}`} suppressHydrationWarning>
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto'}`}>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile Toggle Button (Top Left) */}
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
              title="Open Sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Header Logo (Desktop & Mobile) */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-slate-900 hidden md:block">
                Admin Panel
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-2 text-slate-600 hover:bg-white grid-bg rounded-full transition-colors" suppressHydrationWarning>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
            
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center gap-2 cursor-pointer bg-white grid-bg hover:bg-slate-100 p-1 pr-2 rounded-xl transition-colors border border-slate-100"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold overflow-hidden">
                   A
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block text-sm font-semibold text-slate-700 leading-tight">
                    Super Admin
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 py-3 z-50">
                  <Link 
                    href="/admin/settings"
                    className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white grid-bg transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    System Settings
                  </Link>
                  <div className="h-px bg-slate-100 my-2"></div>
                  <button 
                    className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors w-full text-left"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden flex flex-col items-center">
          <div className="w-full max-w-full px-2">
            {children}
          </div>
        </main>
      </div>

      <style jsx global>{`
        .hidden-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hidden-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
