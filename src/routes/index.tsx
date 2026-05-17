import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { AdminSidebar } from "@/components/AdminSidebar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview — Accredit Admin" },
      { name: "description", content: "System administrator overview of the accreditation platform." },
    ],
  }),
  component: Overview,
});

const volumeData = [
  { m: "J", v: 240 }, { m: "F", v: 300 }, { m: "M", v: 200 },
  { m: "A", v: 380 }, { m: "M", v: 260 }, { m: "J", v: 420 },
  { m: "J", v: 340 }, { m: "A", v: 460 }, { m: "S", v: 380 },
  { m: "O", v: 540 }, { m: "N", v: 440 }, { m: "D", v: 500 },
];

function StatCard({ label, value, sub, valueClass = "text-foreground" }: {
  label: string; value: string; sub?: string; valueClass?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className={`mt-2 text-3xl font-semibold tracking-tight ${valueClass}`}>{value}</div>
      {sub && <div className="mt-2 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function MiniStat({ label, value, valueClass }: { label: string; value: string; valueClass: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-1.5 text-2xl font-semibold ${valueClass}`}>{value}</div>
    </div>
  );
}

function Overview() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-x-hidden">
        <header className="flex items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here's what's happening with your accreditation system today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search institutions, applications..."
                className="h-10 w-80 rounded-full border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">
              <Plus className="h-4 w-4" /> New Report
            </button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-4 px-8">
          <StatCard label="Total Applications" value="4,209" sub="+12% this month" />
          <StatCard label="Revenue Collected" value="$1.2M" sub="+15% vs last year" />
          <StatCard label="Active Inspections" value="42" sub="Across 12 regions" />
        </div>

        <div className="grid grid-cols-3 gap-4 px-8 py-4">
          <div className="col-span-2 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Application Volume</h2>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">Last 12 Months</span>
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData} barCategoryGap="22%">
                  <XAxis
                    dataKey="m"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <Bar dataKey="v" radius={[8, 8, 8, 8]} background={{ fill: "oklch(0.94 0.01 260)", radius: 8 }}>
                    {volumeData.map((_, i) => (
                      <Cell key={i} fill="var(--primary)" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MiniStat label="Pending Reviews" value="184" valueClass="text-warning" />
            <MiniStat label="License Issued" value="3.8k" valueClass="text-success" />
            <MiniStat label="Suspended" value="14" valueClass="text-danger" />
            <MiniStat label="Expired" value="89" valueClass="text-warning" />
            <MiniStat label="SLA Breaches" value="3" valueClass="text-danger" />
            <MiniStat label="Failed Logins" value="12" valueClass="text-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 px-8 pb-8">
          <StatCard label="Institutions Verified" value="312" sub="48 pending verification" />
          <StatCard label="Open Conditions" value="76" sub="12 overdue" />
          <StatCard label="Appeals Under Review" value="9" sub="3 escalated" />
        </div>
      </main>
    </div>
  );
}
