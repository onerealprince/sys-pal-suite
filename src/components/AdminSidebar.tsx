import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutGrid, Users, Shield, Building2, FileText, GitBranch,
  FormInput, CreditCard, BookMarked, ListChecks, Bell, ClipboardList,
  BarChart3, Plug, Lock, Settings, LogOut,
} from "lucide-react";

const nav = [
  { to: "/", label: "Overview", icon: LayoutGrid },
  { to: "/users", label: "Users", icon: Users },
  { to: "/roles", label: "Roles", icon: Shield },
  { to: "/institutions", label: "Institutions", icon: Building2 },
  { to: "/applications", label: "Applications", icon: FileText },
  { to: "/workflows", label: "Workflows", icon: GitBranch },
  { to: "/schemas", label: "Schemas", icon: FormInput },
  { to: "/payments", label: "Payments", icon: CreditCard },
  { to: "/registry", label: "Registry", icon: BookMarked },
  { to: "/conditions", label: "Conditions", icon: ListChecks },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/audit", label: "Audit", icon: ClipboardList },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/integrations", label: "Integrations", icon: Plug },
  { to: "/security", label: "Security", icon: Lock },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="flex h-screen w-60 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
          A
        </div>
        <span className="text-base font-semibold text-foreground">Accredit</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to as never}
              className={`mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-sidebar-active text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 border-t border-border px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
          SA
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-foreground">Sarah Admin</div>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <LogOut className="h-3 w-3" /> Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
