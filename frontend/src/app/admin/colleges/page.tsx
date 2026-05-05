"use client";

import {
  Search,
  Filter,
  Plus,
  MapPin,
  Building2,
  Users,
  Trophy,
  Star,
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  Globe,
  UploadCloud,
  Download,
  Shield,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ManageCollegesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    state: "",
    affiliatedWith: "",
    exam: "",
    minNIRF: "",
    maxNIRF: "",
    minRating: "",
  });

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          search: searchTerm,
          page: currentPage.toString(),
          limit: "10",
          ...filters,
        });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/colleges?${queryParams}`,
        );
        const json = await res.json();
        if (json.success) {
          setColleges(json.data);
          setTotalPages(json.pagination.pages);
          setTotalCount(json.pagination.total);
        }
      } catch (err) {
        console.error("Failed to fetch colleges", err);
        setError(
          "Could not connect to the server. Please ensure the backend is running.",
        );
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchColleges();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, currentPage, filters]);

  const handleBulkUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/upload-colleges`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      if (data.success) {
        alert(`${data.count} colleges uploaded successfully!`);
        window.location.reload();
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleExportColleges = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/admin/export-colleges`;
  };

  return (
    <div
      className="max-w-none space-y-6 pb-10 px-4 font-inter"
      suppressHydrationWarning
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Manage Colleges
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            View and manage the comprehensive university database
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportColleges}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export
          </button>
          <label
            className={`cursor-pointer bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
          >
            <UploadCloud className="w-4 h-4" />
            {isUploading ? "Uploading..." : "Bulk Upload (Excel/CSV)"}
            <input
              type="file"
              className="hidden"
              accept=".xlsx, .xls, .csv"
              onChange={handleBulkUpload}
            />
          </label>
          <Link
            href="/admin/colleges/add"
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10"
          >
            <Plus className="w-4 h-4" /> Add College
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by college name, city or state..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suppressHydrationWarning
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer ${
                showFilters || filters.type || filters.state
                  ? "bg-teal-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
              suppressHydrationWarning
            >
              <Filter className="w-4 h-4" />
              {filters.type || filters.state ? "Filters Active" : "Filter"}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-8 bg-slate-50 border-b border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Type Filter */}
              <div className="space-y-2">
                <label className="text-[10px] md:text-sm font-semibold text-slate-700  tracking-widest ml-1">
                  College Type
                </label>
                <select
                  className="w-full bg-white border border-slate-200 rounded-md px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500/20"
                  value={filters.type}
                  onChange={(e) => {
                    setFilters({ ...filters, type: e.target.value });
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Types</option>
                  <option value="Govt">Government</option>
                  <option value="Private">Private</option>
                  <option value="Semi-Govt">Semi-Govt</option>
                </select>
              </div>

              {/* State Filter */}
              <div className="space-y-2">
                <label className="text-[10px] md:text-sm font-semibold text-slate-700  tracking-widest ml-1">
                  State / Territory
                </label>
                <input
                  type="text"
                  placeholder="Search state..."
                  className="w-full bg-white border border-slate-200 rounded-md px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500/20"
                  value={filters.state}
                  onChange={(e) => {
                    setFilters({ ...filters, state: e.target.value });
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* NIRF Range */}
              <div className="space-y-2">
                <label className="text-[10px] md:text-sm font-semibold text-slate-700  tracking-widest ml-1">
                  NIRF Rank Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full bg-white border border-slate-200 rounded-md px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500/20"
                    value={filters.minNIRF}
                    onChange={(e) => {
                      setFilters({ ...filters, minNIRF: e.target.value });
                      setCurrentPage(1);
                    }}
                  />
                  <span className="text-slate-300">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full bg-white border border-slate-200 rounded-md px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500/20"
                    value={filters.maxNIRF}
                    onChange={(e) => {
                      setFilters({ ...filters, maxNIRF: e.target.value });
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {/* Min Rating */}
              <div className="space-y-2">
                <label className="text-[10px] md:text-sm font-semibold text-slate-700  tracking-widest ml-1">
                  Min Rating
                </label>
                <select
                  className="w-full bg-white border border-slate-200 rounded-md px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500/20"
                  value={filters.minRating}
                  onChange={(e) => {
                    setFilters({ ...filters, minRating: e.target.value });
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3.0">3.0+ Stars</option>
                </select>
              </div>

              {/* Entrance Exam */}
              <div className="space-y-2">
                <label className="text-[10px] md:text-sm font-semibold text-slate-700  tracking-widest ml-1">
                  Entrance Exam
                </label>
                <input
                  type="text"
                  placeholder="e.g. JEE, NEET"
                  className="w-full bg-white border border-slate-200 rounded-md px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500/20"
                  value={filters.exam}
                  onChange={(e) => {
                    setFilters({ ...filters, exam: e.target.value });
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Affiliation */}
              <div className="space-y-2">
                <label className="text-[10px] md:text-sm font-semibold text-slate-700  tracking-widest ml-1">
                  Affiliated With
                </label>
                <input
                  type="text"
                  placeholder="e.g. AICTE, UGC"
                  className="w-full bg-white border border-slate-200 rounded-md px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500/20"
                  value={filters.affiliatedWith}
                  onChange={(e) => {
                    setFilters({ ...filters, affiliatedWith: e.target.value });
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Reset Controls */}
              <div className="flex items-center gap-3 pt-6 lg:col-span-2">
                <button
                  onClick={() => {
                    setFilters({
                      type: "",
                      state: "",
                      affiliatedWith: "",
                      exam: "",
                      minNIRF: "",
                      maxNIRF: "",
                      minRating: "",
                    });
                    setCurrentPage(1);
                  }}
                  className="px-6 py-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-md text-xs font-bold cursor-pointer   tracking-widest transition-colors"
                >
                  Clear 
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2.5 text-teal-600 font-bold text-xs hover:underline"
                >
                  Close Panel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">
                  Logo
                </th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">
                  College Name
                </th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">
                  Short Name
                </th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">
                  Type
                </th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">
                  Affiliation
                </th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">
                  Exams
                </th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">
                  City
                </th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">
                  State
                </th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">
                  NIRF
                </th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-slate-500 font-bold">
                        Fetching colleges...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={10} className="px-6 py-20 text-center">
                    <div className="text-rose-500 font-bold bg-rose-50 p-4 rounded-xl inline-block">
                      {error}
                    </div>
                  </td>
                </tr>
              ) : colleges.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-20 text-center text-slate-500 font-bold"
                  >
                    No colleges found. Try a different search.
                  </td>
                </tr>
              ) : (
                colleges.map((college, i) => (
                  <tr
                    key={college._id || i}
                    className="hover:bg-teal-50/30 transition-colors border-b border-slate-50 last:border-0"
                  >
                    <td className="px-4 py-4">
                      <div className="w-10 h-10 rounded-sm bg-white border border-slate-200 flex items-center justify-center  shadow-sm overflow-hidden">
                        {college.logo ? (
                          <img
                            src={college.logo}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 text-sm leading-tight">
                          {college.name}
                        </span>
                        {college.website && (
                          <a
                            href={college.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-teal-600 hover:underline mt-0.5 flex items-center gap-1"
                          >
                            Visit Website <Globe className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-bold text-slate-700">
                        {college.shortName || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-tight ${
                          college.type === "Govt"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {college.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-slate-700">
                      {college.affiliatedWith || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[120px]">
                        {college.entranceExams &&
                        college.entranceExams.length > 0 ? (
                          college.entranceExams
                            .slice(0, 2)
                            .map((exam: string, index: number) => (
                              <span
                                key={index}
                                className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded text-[9px] font-semibold border border-slate-200"
                              >
                                {exam}
                              </span>
                            ))
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">
                            None
                          </span>
                        )}
                        {college.entranceExams?.length > 2 && (
                          <span className="text-[9px] font-bold text-slate-400">
                            +{college.entranceExams.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-slate-900">
                      {college.location}
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-slate-900">
                      {college.state}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 font-semibold text-slate-900 text-xs">
                        <Trophy className="w-3 h-3 text-amber-500" /> #
                        {college.nirfRank || "—"}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/colleges/edit/${college._id}`}
                          className="p-1.5 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors rounded-lg border border-transparent hover:border-teal-100"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="p-1.5 text-rose-500 hover:bg-rose-50 transition-colors rounded-lg border border-transparent hover:border-rose-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing {(currentPage - 1) * 10 + 1} to{" "}
              {Math.min(currentPage * 10, totalCount)} of {totalCount} Colleges
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === page
                        ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
