import { Briefcase, MapPin, ArrowUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  industries: string[];
  locations: string[];
  industryFilter: string;
  locationFilter: string;
  sortOrder: string;
  onIndustryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterBar = ({
  industries,
  locations,
  industryFilter,
  locationFilter,
  sortOrder,
  onIndustryChange,
  onLocationChange,
  onSortChange,
  onClearFilters,
  hasActiveFilters,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
      {/* Industry Filter */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Briefcase className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
        </div>
        <Select value={industryFilter} onValueChange={onIndustryChange}>
          <SelectTrigger 
            className="pl-10 h-12 bg-card border-border hover:border-primary/50 transition-colors focus:ring-primary"
            aria-label="Filter by industry"
          >
            <SelectValue placeholder="All Industries" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem 
                key={industry} 
                value={industry}
                className="cursor-pointer"
              >
                {industry === "All" ? "All Industries" : industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location Filter */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <MapPin className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
        </div>
        <Select value={locationFilter} onValueChange={onLocationChange}>
          <SelectTrigger 
            className="pl-10 h-12 bg-card border-border hover:border-primary/50 transition-colors focus:ring-primary"
            aria-label="Filter by location"
          >
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem 
                key={location} 
                value={location}
                className="cursor-pointer"
              >
                {location === "All" ? "All Locations" : location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Filter */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
        </div>
        <Select value={sortOrder} onValueChange={onSortChange}>
          <SelectTrigger 
            className="pl-10 h-12 bg-card border-border hover:border-primary/50 transition-colors focus:ring-primary"
            aria-label="Sort companies"
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc" className="cursor-pointer">
              Company Name (A-Z)
            </SelectItem>
            <SelectItem value="desc" className="cursor-pointer">
              Company Name (Z-A)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      </div>
      
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors flex-shrink-0"
          aria-label="Clear all filters"
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};
