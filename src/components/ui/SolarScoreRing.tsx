import React from 'react';

interface SolarScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const SolarScoreRing: React.FC<SolarScoreRingProps> = ({ score, size = 'md', showLabel = true }) => {
  const getScoreColor = () => {
    if (score >= 85) return 'text-emerald-500 stroke-emerald-500';
    if (score >= 70) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  const getScoreRating = () => {
    if (score >= 85) return 'Prime Yield';
    if (score >= 75) return 'High Potential';
    if (score >= 65) return 'Viable';
    return 'Marginal';
  };

  const dimensions = {
    sm: { diameter: 48, stroke: 4, text: 'text-xs', label: 'text-[9px]' },
    md: { diameter: 72, stroke: 6, text: 'text-lg', label: 'text-xs' },
    lg: { diameter: 100, stroke: 8, text: 'text-2xl', label: 'text-sm' },
  }[size];

  const radius = (dimensions.diameter - dimensions.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={dimensions.diameter}
          height={dimensions.diameter}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={dimensions.diameter / 2}
            cy={dimensions.diameter / 2}
            r={radius}
            strokeWidth={dimensions.stroke}
            className="stroke-slate-200 dark:stroke-slate-700 fill-none"
          />
          {/* Progress circle */}
          <circle
            cx={dimensions.diameter / 2}
            cy={dimensions.diameter / 2}
            r={radius}
            strokeWidth={dimensions.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${getScoreColor()} fill-none transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-bold font-mono text-slate-800 dark:text-white ${dimensions.text}`}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Solar Score</span>
          <span className={`font-semibold ${dimensions.label} ${getScoreColor()}`}>
            {getScoreRating()}
          </span>
        </div>
      )}
    </div>
  );
};
