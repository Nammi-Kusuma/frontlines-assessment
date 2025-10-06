import { Building2 } from "lucide-react";

export const EmptyState = () => (
  <div 
    className="flex flex-col items-center justify-center py-20 animate-scale-in"
    role="status"
    aria-live="polite"
  >
    <Building2 className="w-16 h-16 text-muted-foreground mb-4" aria-hidden="true" />
    <h3 className="text-2xl font-semibold text-foreground mb-2">
      No Companies Found
    </h3>
    <p className="text-muted-foreground text-center max-w-md">
      Try adjusting your search or filters to find what you're looking for.
    </p>
  </div>
);
