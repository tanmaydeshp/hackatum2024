// src/components/ui/CategoryBadge.tsx
interface Props {
  category: string;
}

export const CategoryBadge = ({ category }: Props) => {
  return (
    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
      {category}
    </span>
  );
};
