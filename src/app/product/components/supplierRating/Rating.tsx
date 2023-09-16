import React from "react";

const StarRating = ({ rating }: any) => {
  // Calculate the number of filled stars
  const filledStars = Math.floor(rating);
  // Determine if there's a half star (e.g., 3.5) by checking the decimal part of the rating
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          fill={index < filledStars ? "yellow" : "gray"}
          stroke="gray"
          strokeWidth="0.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2l1.4 4.9H20l-3.8 2.3 1.5 4.8L12 12.3 7.3 19l1.5-4.8L4 6.9h4.6z"
            fillRule="evenodd"
          />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          fill="yellow"
          stroke="gray"
          strokeWidth="0.5"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2l1.4 4.9H20l-3.8 2.3 1.5 4.8L12 12.3V2z"
            fillRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};

export default StarRating;
