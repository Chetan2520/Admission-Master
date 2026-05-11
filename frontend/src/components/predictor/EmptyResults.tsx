import React from "react";
import { ClipboardCheck, AlertCircle } from "lucide-react";

export default function EmptyResults({ hasSearched }: { hasSearched: boolean }) {
  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-slate-100 rounded-lg">
        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded flex items-center justify-center mb-6">
            <ClipboardCheck className="w-5 h-5 text-slate-400" />
        </div>
        <h2 className="text-sm font-medium text-slate-800 mb-2 uppercase tracking-widest">Awaiting Input Parameters</h2>
        <p className="text-slate-500 max-w-xs mx-auto leading-relaxed text-xs">
          Please complete the evaluation form above to generate your institutional placement report.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-slate-100 rounded-lg">
      <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded flex items-center justify-center mb-6">
        <AlertCircle className="w-5 h-5 text-rose-500" />
      </div>
      <h2 className="text-sm font-medium text-slate-800 mb-2 uppercase tracking-widest">No Institutional Matches</h2>
      <p className="text-slate-500 max-w-xs mx-auto leading-relaxed text-xs px-6">
        The specified rank and category parameters do not meet historical admission thresholds for the current selection.
      </p>
    </div>
  );
}
