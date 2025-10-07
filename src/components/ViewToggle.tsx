import { Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex gap-1 p-1 bg-card border border-border rounded-lg" role="group" aria-label="View toggle">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("grid")}
        className={`transition-colors ${
          view === "grid" 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        }`}
        aria-label="Grid view"
        aria-pressed={view === "grid"}
      >
        <Grid3x3 className="w-4 h-4" />
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("list")}
        className={`transition-colors ${
          view === "list" 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        }`}
        aria-label="List view"
        aria-pressed={view === "list"}
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  );
};
