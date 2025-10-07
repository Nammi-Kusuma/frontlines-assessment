import { Briefcase, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CompanyCardProps {
  company: {
    id: number;
    name: string;
    industry: string;
    location: string;
    website: string;
    description?: string;
  };
  index: number;
  view?: "grid" | "list";
}

export const CompanyCard = ({ company, index, view = "grid" }: CompanyCardProps) => {
  const isListView = view === "list";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
    >
      <Card
        className={`group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 ${
          isListView ? "hover:scale-[1.01]" : "hover:scale-[1.02]"
        }`}
        role="article"
        aria-label={`${company.name} - ${company.industry} company in ${company.location}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.open(company.website, "_blank", "noopener,noreferrer");
          }
        }}
      >
        <CardContent className={isListView ? "p-6" : "p-6"}>
          <div className={isListView ? "flex items-start justify-between gap-6" : ""}>
            <div className={isListView ? "flex-1" : ""}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {company.name}
                </h3>
                {!isListView && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4 shrink-0 border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(company.website, "_blank", "noopener,noreferrer");
                    }}
                    aria-label={`Visit ${company.name} website`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Site
                  </Button>
                )}
              </div>
              <div className={isListView ? "flex items-center gap-4 mb-3" : "space-y-2 mb-4"}>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <Briefcase className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">{company.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">{company.location}</span>
                </div>
              </div>
              {isListView && company.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {company.description}
                </p>
              )}
            </div>
            {isListView && (
              <Button
                variant="outline"
                size="default"
                className="group/btn border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 flex-shrink-0"
                onClick={() => window.open(company.website, "_blank", "noopener,noreferrer")}
                aria-label={`Visit ${company.name} website`}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Site
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
