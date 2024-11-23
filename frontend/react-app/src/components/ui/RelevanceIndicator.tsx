// src/components/ui/RelevanceIndicator.tsx
interface Props {
  score: number;
}

export const RelevanceIndicator = ({ score }: Props) => {
  const width = `${score * 100}%`;

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width }} />
      </div>
      <span className="text-xs text-gray-400">{Math.round(score * 100)}%</span>
    </div>
  );
};
