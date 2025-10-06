import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <Search 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" 
        aria-hidden="true"
      />
      <Input
        type="text"
        placeholder="Search by company name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-6 rounded-full border-border bg-card text-foreground focus-visible:ring-primary focus-visible:border-primary transition-all"
        aria-label="Search companies by name"
      />
    </div>
  );
};
