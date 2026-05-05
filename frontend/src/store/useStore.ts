import { create } from 'zustand';

interface PredictionState {
  results: any[];
  isLoading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  
  setResults: (results: any[]) => void;
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: { totalResults: number; currentPage: number; totalPages: number }) => void;
}

export const useStore = create<PredictionState>((set) => ({
  results: [],
  isLoading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  totalPages: 1,

  setResults: (results) => set({ results }),
  setLoading: (status) => set({ isLoading: status }),
  setError: (error) => set({ error }),
  setPagination: (pagination) => set({ ...pagination }),
}));
