import React from "react";

type ProductRatingProps = {
  avg_rating: number;
  ratings_number: number;
};

const MAX_STARS = 7;

export const ProductRating: React.FC<ProductRatingProps> = ({
  avg_rating,
  ratings_number,
}) => {
    
  const normalized = Math.max(0, Math.min(avg_rating, MAX_STARS));
  const fullStars = Math.floor(normalized);
  const hasHalfStar = normalized - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: MAX_STARS }).map((_, i) => {
          const isFull = i < fullStars;
          const isHalf = i === fullStars && hasHalfStar;

          return (
            <Star key={i} filled={isFull} half={isHalf} />
          );
        })}
      </div>

      <span className="text-sm text-gray-600">
        {avg_rating.toFixed(1)} ({ratings_number})
      </span>
    </div>
  );
};

type StarProps = {
  filled: boolean;
  half?: boolean;
};

const Star: React.FC<StarProps> = ({ filled, half }) => {
  if (half) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="gold" />
            <stop offset="50%" stopColor="lightgray" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half)"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill={filled ? "gold" : "lightgray"}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};
