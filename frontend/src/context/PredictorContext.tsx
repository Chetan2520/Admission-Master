"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { College, Cutoff } from "@/lib/predictorEngine";

type PredictorFilters = {
  type: string[];
  state: string[];
  course: string[];
};

type PredictorContextType = {
  exam: string;
  setExam: (val: string) => void;
  rank: string;
  setRank: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  budget: string;
  setBudget: (val: string) => void;
  results: (College | Cutoff)[];
  setResults: (val: (College | Cutoff)[]) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  hasSearched: boolean;
  setHasSearched: (val: boolean) => void;
  filters: PredictorFilters;
  setFilters: (val: PredictorFilters) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  totalPages: number;
  setTotalPages: (val: number) => void;
};

const PredictorContext = createContext<PredictorContextType | undefined>(undefined);

export function PredictorProvider({ children }: { children: ReactNode }) {
  const [exam, setExam] = useState("NEET UG");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("General");
  const [budget, setBudget] = useState("any");
  const [results, setResults] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState<PredictorFilters>({
    type: [],
    state: [],
    course: [],
  });
  const [sortBy, setSortBy] = useState("best_match");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <PredictorContext.Provider
      value={{
        exam, setExam,
        rank, setRank,
        category, setCategory,
        budget, setBudget,
        results, setResults,
        isLoading, setIsLoading,
        hasSearched, setHasSearched,
        filters, setFilters,
        sortBy, setSortBy,
        currentPage, setCurrentPage,
        totalPages, setTotalPages
      }}
    >
      {children}
    </PredictorContext.Provider>
  );
}

export function usePredictorContext() {
  const context = useContext(PredictorContext);
  if (context === undefined) {
    throw new Error("usePredictorContext must be used within a PredictorProvider");
  }
  return context;
}
