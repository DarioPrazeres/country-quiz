import { useMemo } from "react";

export function useScore(point: number, total: number) {
  return useMemo(() => {
    const percentage = total > 0 ? Math.round((point / total) * 100) : 0;

    let messageKey = "keep_trying";
    let messageClass = "score-poor";
    let emoji = "📚";

    if (percentage === 100) {
      messageKey = "perfect_score";
      messageClass = "score-perfect";
      emoji = "🏆";
    } else if (percentage >= 80) {
      messageKey = "excellent";
      messageClass = "score-excellent";
      emoji = "🎉";
    } else if (percentage >= 60) {
      messageKey = "good_job";
      messageClass = "score-good";
      emoji = "👏";
    } else if (percentage >= 40) {
      messageKey = "not_bad";
      messageClass = "score-fair";
      emoji = "👍";
    }

    return {
      percentage,
      messageKey,
      messageClass,
      emoji,
    };
  }, [point, total]);
}
