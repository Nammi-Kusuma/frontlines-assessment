import { Building2 } from "lucide-react";

interface StatsBarProps {
  showing: number;
  total: number;
}

export const StatsBar = ({ showing, total }: StatsBarProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-card border border-border rounded-lg shadow-sm">
      <Building2 className="w-4 h-4 text-primary" aria-hidden="true" />
      <span className="text-sm font-medium text-foreground">
        Showing <span className="text-primary font-semibold">{showing}</span> of{" "}
        <span className="font-semibold">{total}</span> Companies
      </span>
    </div>
  );
};
