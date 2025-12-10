import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className={`font-bold ${sizes[size]} flex items-center gap-2`}>
      <span className="text-gradient">تكوين</span>
      <div className="w-2 h-2 rounded-full bg-accent animate-pulse-subtle" />
    </div>
  );
};
