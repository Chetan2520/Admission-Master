import React from "react";
import { Search, ClipboardCheck } from "lucide-react";

export default function EmptyResults({ hasSearched }: { hasSearched: boolean }) {
  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-slate-200 border-dashed">
        <div className="w-16 h-16 bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
            <ClipboardCheck className="w-8 h-8 text-slate-900" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight uppercase tracking-widest">Institutional Data Ready</h2>
        <p className="text-slate-700 font-medium max-w-sm mx-auto leading-relaxed text-sm">
          Awaiting input parameters. Please complete the form in the banner above to generate your admission probability report.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-slate-200">
      <div className="w-16 h-16 bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
        <Search className="w-8 h-8 text-slate-300" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight uppercase tracking-widest">No Institutions Found</h2>
      <p className="text-slate-700 font-medium max-w-sm mx-auto leading-relaxed text-sm">
        Your criteria (Rank/Category) did not match any historical admission data in our database. Please refine your parameters and search again.
      </p>
    </div>
  );
}
