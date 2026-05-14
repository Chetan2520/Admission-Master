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
  setExam: React.Dispatch<React.SetStateAction<string>>;
  rank: string;
  setRank: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  budget: string;
  setBudget: React.Dispatch<React.SetStateAction<string>>;
  results: (College | Cutoff)[];
  setResults: React.Dispatch<React.SetStateAction<(College | Cutoff)[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hasSearched: boolean;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
  filters: PredictorFilters;
  setFilters: React.Dispatch<React.SetStateAction<PredictorFilters>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  marks: string;
  setMarks: React.Dispatch<React.SetStateAction<string>>;
  predictionData: any;
  setPredictionData: React.Dispatch<React.SetStateAction<any>>;
};

const PredictorContext = createContext<PredictorContextType | undefined>(undefined);

export function PredictorProvider({ children }: { children: ReactNode }) {
  const [exam, setExam] = useState("NEET UG");
  const [rank, setRank] = useState("");
  const [marks, setMarks] = useState("");
  const [category, setCategory] = useState("General");
  const [budget, setBudget] = useState("any");
  const [results, setResults] = useState<(College | Cutoff)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState<PredictorFilters>({
    type: [],
    state: ["all"],
    course: [],
  });
  const [sortBy, setSortBy] = useState("best_match");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [predictionData, setPredictionData] = useState<any>(null);

  return (
    <PredictorContext.Provider
      value={{
        exam, setExam,
        rank, setRank,
        marks, setMarks,
        category, setCategory,
        budget, setBudget,
        results, setResults,
        isLoading, setIsLoading,
        hasSearched, setHasSearched,
        filters, setFilters,
        sortBy, setSortBy,
        currentPage, setCurrentPage,
        totalPages, setTotalPages,
        predictionData, setPredictionData
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
