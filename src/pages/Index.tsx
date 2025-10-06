import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CompanyCard } from "@/components/CompanyCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { PaginationControls } from "@/components/PaginationControls";
import { SkeletonCard } from "@/components/SkeletonCard";
import { EmptyState } from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StatsBar } from "@/components/StatsBar";
import { ViewToggle } from "@/components/ViewToggle";

// Mock company data
const MOCK_COMPANIES = [
  { id: 1, name: "Tata Consultancy Services", industry: "Technology", location: "Mumbai", website: "https://tcs.com", description: "Leading global IT services, consulting and business solutions organization." },
  { id: 2, name: "HDFC Bank", industry: "Finance", location: "Mumbai", website: "https://hdfcbank.com", description: "Premier Indian banking and financial services company with a nationwide presence." },
  { id: 3, name: "Apollo Hospitals", industry: "Healthcare", location: "Chennai", website: "https://apollohospitals.com", description: "Leading healthcare provider in Asia with world-class medical facilities and services." },
  { id: 4, name: "Tata Power", industry: "Energy", location: "Mumbai", website: "https://tatapower.com", description: "India's largest integrated power company with a growing renewable energy portfolio." },
  { id: 5, name: "Zee Media", industry: "Media", location: "Noida", website: "https://zeemedia.zeenews.com", description: "One of India's largest news networks with multiple news channels and digital platforms." },
  { id: 6, name: "Infosys", industry: "Technology", location: "Bengaluru", website: "https://infosys.com", description: "Global leader in next-generation digital services and consulting." },
  { id: 7, name: "Asian Paints", industry: "Manufacturing", location: "Mumbai", website: "https://asianpaints.com", description: "India's leading paint company and Asia's third largest paint company." },
  { id: 8, name: "Reliance Retail", industry: "Retail", location: "Mumbai", website: "https://relianceretail.com", description: "Largest retailer in India with a strong omnichannel presence." },
  { id: 9, name: "Sun Pharma", industry: "Pharmaceuticals", location: "Mumbai", website: "https://sunpharma.com", description: "India's largest pharmaceutical company and global specialty generic pharma company." },
  { id: 10, name: "Zomato", industry: "Food & Beverage", location: "Gurugram", website: "https://zomato.com", description: "One of India's largest food delivery and restaurant discovery platforms." },
  { id: 11, name: "Ola Cabs", industry: "Transportation", location: "Bengaluru", website: "https://olacabs.com", description: "India's largest mobility platform and one of the world's largest ride-hailing companies." },
  { id: 12, name: "Byju's", industry: "Education", location: "Bengaluru", website: "https://byjus.com", description: "India's largest edtech company and the creator of India's largest K-12 learning app." },
  { id: 13, name: "Larsen & Toubro", industry: "Construction", location: "Mumbai", website: "https://larsentoubro.com", description: "Indian multinational engaged in technology, engineering, construction, manufacturing and financial services." },
  { id: 14, name: "Bharti Airtel", industry: "Telecom", location: "New Delhi", website: "https://airtel.in", description: "Leading global telecommunications company with operations in 18 countries across Asia and Africa." },
  { id: 15, name: "Wipro", industry: "Technology", location: "Bengaluru", website: "https://wipro.com", description: "Leading global information technology, consulting and business process services company." },
  { id: 16, name: "ITC Limited", industry: "FMCG", location: "Kolkata", website: "https://itcportal.com", description: "Diversified conglomerate with businesses in FMCG, hotels, paperboards, packaging, agri-business and IT." },
  { id: 17, name: "Mahindra & Mahindra", industry: "Automobile", location: "Mumbai", website: "https://mahindra.com", description: "Indian multinational automotive manufacturing corporation and part of the Mahindra Group." },
  { id: 18, name: "Taj Hotels", industry: "Hospitality", location: "Mumbai", website: "https://tajhotels.com", description: "Luxury hotel chain and one of Asia's largest and finest hotel companies." },
];

const ITEMS_PER_PAGE = 9;

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize state from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [industryFilter, setIndustryFilter] = useState(searchParams.get("industry") || "All");
  const [locationFilter, setLocationFilter] = useState(searchParams.get("location") || "All");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "asc");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);

  // Sync state to URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (industryFilter !== "All") params.set("industry", industryFilter);
    if (locationFilter !== "All") params.set("location", locationFilter);
    if (sortOrder !== "asc") params.set("sort", sortOrder);
    if (currentPage !== 1) params.set("page", currentPage.toString());
    setSearchParams(params, { replace: true });
  }, [searchQuery, industryFilter, locationFilter, sortOrder, currentPage, setSearchParams]);

  // Extract unique industries and locations
  const industries = ["All", ...Array.from(new Set(MOCK_COMPANIES.map((c) => c.industry)))];
  const locations = ["All", ...Array.from(new Set(MOCK_COMPANIES.map((c) => c.location)))];

  // Filter and sort companies
  const filteredCompanies = useMemo(() => {
    let filtered = MOCK_COMPANIES.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = industryFilter === "All" || company.industry === industryFilter;
      const matchesLocation = locationFilter === "All" || company.location === locationFilter;
      return matchesSearch && matchesIndustry && matchesLocation;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    return filtered;
  }, [searchQuery, industryFilter, locationFilter, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, industryFilter, locationFilter, sortOrder]);

  // Check if filters are active
  const hasActiveFilters = industryFilter !== "All" || locationFilter !== "All" || sortOrder !== "asc" || searchQuery !== "";

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setIndustryFilter("All");
    setLocationFilter("All");
    setSortOrder("asc");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header with Theme Toggle */}
        <header className="mb-8 sm:mb-12 animate-fade-in flex items-start justify-between" role="banner">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3">
              Companies Directory
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Discover and filter top companies
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Stats Bar and View Toggle */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <StatsBar showing={paginatedCompanies.length} total={filteredCompanies.length} />
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        {/* Controls Bar */}
        <div className="mb-8 space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            industries={industries}
            locations={locations}
            industryFilter={industryFilter}
            locationFilter={locationFilter}
            sortOrder={sortOrder}
            onIndustryChange={setIndustryFilter}
            onLocationChange={setLocationFilter}
            onSortChange={setSortOrder}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Company Grid/List */}
        <main role="main" aria-label="Companies list">
          {isLoading ? (
            <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"} role="status" aria-label="Loading companies">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : paginatedCompanies.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" : "space-y-4 mb-8"}
                >
                  {paginatedCompanies.map((company, index) => (
                    <CompanyCard key={company.id} company={company} index={index} view={view} />
                  ))}
                </motion.div>
              </AnimatePresence>

              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
