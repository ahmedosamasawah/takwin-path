import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  linkTo?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', linkTo }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  const content = (
    <div className={`font-bold ${sizes[size]} flex items-center gap-2`}>
      <span className="text-gradient">تكوين</span>
      <div className="w-2 h-2 rounded-full bg-accent animate-pulse-subtle" />
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo}>{content}</Link>;
  }

  return content;
};
