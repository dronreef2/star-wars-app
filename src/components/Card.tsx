import { ChevronRight } from 'lucide-react';

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Card({ title, subtitle, children, onClick, className = '' }: CardProps) {
  const baseClasses = "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200";
  const clickableClasses = onClick ? "cursor-pointer hover:bg-gray-50" : "";
    const handleKeyPress = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyPress}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        {onClick && (
          <ChevronRight className="h-5 w-5 text-gray-400" />
        )}
      </div>
      
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export function DetailItem({ label, value, className = '' }: DetailItemProps) {
  return (
    <div className={`flex justify-between items-center py-1 ${className}`}>
      <span className="text-sm font-medium text-gray-600">{label}:</span>
      <span className="text-sm text-gray-900 font-medium">{value}</span>
    </div>
  );
}
