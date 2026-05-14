"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  GraduationCap,
  Building2,
  Filter,
  Star,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Trophy,
  Users,
  BarChart3,
  ChevronRight,
  Calculator,
  Activity,
  ChevronLeft,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useStore } from "@/store/useStore";

function CollegesContent() {
  const {
    results,
    isLoading,
    totalResults,
    currentPage,
    totalPages,
    setResults,
    setPagination,
    setLoading,
  } = useStore();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    const exam = searchParams.get("exam");
    const rank = searchParams.get("rank");
    const category = searchParams.get("category");

    if (exam && rank && category) {
      fetchPredictions(exam, rank, category);
    } else {
      fetchAllColleges();
    }
  }, [searchParams]);

  const fetchPredictions = async (
    exam: string,
    rank: string,
    category: string,
    page = 1,
  ) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predictor/predict?exam=${exam}&rank=${rank}&category=${category}&page=${page}&limit=10`,
      );
      const json = await res.json();
      if (json.success) {
        setResults(json.data);
        setPagination({
          totalResults: json.pagination.totalResults,
          currentPage: json.pagination.currentPage,
          totalPages: json.pagination.totalPages,
        });
      }
    } catch (err) {
      console.error("Failed to fetch predictions", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllColleges = async (page = 1) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/colleges?page=${page}&limit=10&search=${searchTerm}`,
      );
      const json = await res.json();
      if (json.success) {
        setResults(json.data);
        setPagination({
          totalResults: json.pagination.total,
          currentPage: json.pagination.page,
          totalPages: json.pagination.pages,
        });
      }
    } catch (err) {
      console.error("Failed to fetch colleges", err);
    }
  };

  const handleSearch = () => {
    fetchAllColleges(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchAllColleges(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  if (!mounted) return <div className="min-h-screen bg-slate-50" />;

  return (
    <div
      className="min-h-screen bg-[#f8fafc] font-inter pb-20"
      suppressHydrationWarning
    >
      {/* Sleek Hero Section */}
      <section className="relative pt-32 pb-16 bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight"
            >
              Find Your <span className="text-[#14b5a4]">Perfect Campus</span>
            </motion.h1>
            <p className="text-slate-500 text-lg font-medium mb-8">
              Explore {totalResults}+ verified institutions with detailed
              placement and cut-off data.
            </p>

            {/* Minimalist Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#14b5a4] transition-colors" />
                <input
                  type="text"
                  placeholder="Search by college name, city or state..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-[#14b5a4]/10 focus:border-[#14b5a4] transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  suppressHydrationWarning
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-[#14b5a4] hover:bg-[#119b8c] text-white px-8 py-4 rounded-base font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-[#14b5a4]/20 active:scale-95"
                suppressHydrationWarning
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern List View Section */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            Showing {results.length} of {totalResults} Institutions
          </h2>
          <div className="flex gap-2">
            <button
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:border-[#14b5a4] hover:text-[#14b5a4] transition-all"
              suppressHydrationWarning
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="h-28 bg-white border border-slate-100 rounded-3xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {results.length > 0 ? (
                results.map((item, i) => {
                  const college = item.collegeId || item;
                  const uniqueKey = `card-${item._id || i}-${i}`;

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      key={uniqueKey}
                      className="group bg-white border border-slate-200 rounded-[1rem] p-3 md:p-5 hover:border-[#14b5a4] hover:shadow-[0_20px_50px_rgba(20,181,164,0.1)] transition-all duration-500 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
                    >
                      {/* Subtle background decoration */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-500/10 transition-colors"></div>

                      {/* College Logo/Thumbnail */}
                      <div className="w-16 h-16  rounded-[1rem] bg-slate-50 border border-slate-100 flex-shrink-0 relative overflow-hidden flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-500 shadow-inner">
                        {college.logo ? (
                          <Image
                            src={college.logo}
                            alt={college.name}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <Building2 className="w-10 h-10 text-slate-300" />
                        )}
                      </div>

                      {/* College Info */}
                      <div className="flex-1 text-center md:text-left relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-4">
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-[#14b5a4] transition-colors line-clamp-2 leading-tight">
                            {college.name}
                          </h3>
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                            {item.closingRank && (
                              <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-xl text-[10px] font-black border border-teal-100 uppercase tracking-wider">
                                Closing Rank: {item.closingRank}
                              </span>
                            )}
                            <span className="px-3 py-1 bg-green-600/60 text-white rounded-xl text-[10px] font-black   tracking-wider shadow-lg shadow-green-900/10">
                              {college.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-4 gap-x-8 text-sm text-slate-500">
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5   flex items-center justify-center ">
                              <MapPin className="w-5 h-5 text-rose-500" />
                            </div>
                            <span className="text-slate-700">
                              {college.location}, {college.state}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5   flex items-center justify-center ">
                              <Trophy className="w-5 h-5 text-amber-500" />
                            </div>
                            <span className="text-slate-700">
                              NIRF #{college.nirfRank || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5   flex items-center justify-center ">
                              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            </div>
                            <span className="text-slate-700">
                              {college.rating || "4.5"} Rating
                            </span>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
                          {college.shortName && (
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] px-4 py-1 bg-slate-50 rounded-md border border-slate-100">
                              {college.shortName}
                            </span>
                          )}
                          <span className="text-xs font-semibold text-[#14b5a4] uppercase tracking-[0.2em] px-4 py-1 bg-teal-50 rounded-md border border-teal-100">
                            {college.affiliatedWith || "Autonomous University"}
                          </span>
                        </div>
                      </div>

                      {/* Actions Area */}
                      <div className="flex items-center gap-4 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-slate-100 relative z-10">
                        <Link
                          href={`/colleges/${college._id}`}
                          className="flex-1 md:flex-none px-5 py-4 bg-[#14b5a4] text-white rounded-[.5rem] text-sm font-bold   tracking-widest hover:bg-[#119b8c] hover:shadow-xl hover:shadow-teal-500/20 transition-all flex items-center justify-center gap-3 group/btn active:scale-95"
                        >
                          View Details
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-[3rem]"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    No colleges found
                  </h3>
                  <p className="text-slate-500 font-medium">
                    Try adjusting your search or filters to find what you're
                    looking for.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Custom Modern Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#14b5a4] hover:border-[#14b5a4] disabled:opacity-30 transition-all shadow-sm"
              suppressHydrationWarning
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-12 h-12 rounded-2xl text-sm font-bold transition-all ${
                          currentPage === page
                            ? "bg-[#14b5a4] text-white shadow-lg shadow-[#14b5a4]/30"
                            : "bg-white border border-slate-200 text-slate-600 hover:border-[#14b5a4] hover:text-[#14b5a4]"
                        }`}
                        suppressHydrationWarning
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <MoreHorizontal
                        key={page}
                        className="w-6 h-6 text-slate-300 mx-1"
                      />
                    );
                  }
                  return null;
                },
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#14b5a4] hover:border-[#14b5a4] disabled:opacity-30 transition-all shadow-sm"
              suppressHydrationWarning
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <CollegesContent />
    </Suspense>
  );
}
