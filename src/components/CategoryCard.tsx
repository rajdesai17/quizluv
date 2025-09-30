import React from 'react';

interface CategoryCardProps {
  category: {
    name: string;
    icon: string;
    color: string;
  };
  onClick: () => void;
  delay: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, delay }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 animate-scaleIn"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="text-3xl mb-1">{category.icon}</div>
        <span className="text-sm font-medium text-gray-700">{category.name}</span>
      </div>
    </button>
  );
};

export default CategoryCard;