export type College = {
  _id: string;
  name: string;
  shortName: string;
  location: string;
  state: string;
  type: "Govt" | "Private" | "Semi-Govt";
  rating: number;
  nirfRank: number | null;
  seats: number;
  averageCourseFees: string;
  logo: string;
  affiliatedWith: string;
  entranceExams: string[];
  courses: {
    _id: string;
    name: string;
    duration: string;
    fees: string;
  }[];
};

export type Cutoff = {
  _id: string;
  collegeId: College;
  exam: string;
  year: number;
  round: string;
  course: string;
  branch: string;
  category: string;
  quota: string;
  openingRank: number;
  closingRank: number;
  seats: number;
};

export const calculateProbability = (
  item: College | Cutoff,
  userRank: number,
  category: string,
  exam: string
): number => {
  if (!item) return 0;

  // If it's a Cutoff object (real data available)
  if ('closingRank' in item) {
    const cutoff = item as Cutoff;
    const closing = cutoff.closingRank;
    const opening = cutoff.openingRank;

    // 1. If user rank is better than opening rank -> Extremely Safe
    if (userRank <= opening) {
      return 99; // Near 100%
    }

    // 2. If user rank is between opening and closing -> Safe to Moderate
    if (userRank <= closing) {
      // Linear interpolation from 98% to 60%
      const range = closing - opening;
      const position = userRank - opening;
      const factor = 1 - (position / range);
      const score = 60 + (factor * 38);
      return Math.round(score);
    }

    // 3. If user rank is slightly beyond closing rank -> Moderate to Dream
    // (Wait: Backend query usually filters for rank <= closingRank, but let's be safe)
    const diff = userRank - closing;
    const margin = closing * 0.2; // 20% margin
    if (diff <= margin) {
      const factor = 1 - (diff / margin);
      return Math.round(40 + (factor * 20));
    }

    return Math.max(10, Math.round(40 - (diff / closing) * 50));
  }

  // Fallback for College-only objects (Generic estimation)
  let score = 0;
  if ((item as College).type === "Govt") score = 60;
  else score = 45;

  if (userRank < 10000) score += 30;
  else if (userRank <= 50000) score += 20;
  else if (userRank <= 100000) score += 10;

  if (category === "SC" || category === "ST") score += 12;
  else if (category === "OBC") score += 5;

  return Math.min(Math.round(score), 100);
};

export const getProbabilityLabel = (score: number): { label: string; color: string } => {
  if (score >= 85) return { label: "Safe", color: "bg-emerald-500" };
  if (score >= 65) return { label: "Moderate", color: "bg-amber-500" };
  return { label: "Dream", color: "bg-rose-500" };
};
