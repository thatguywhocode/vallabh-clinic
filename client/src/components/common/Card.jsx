import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white/80 backdrop-blur-sm border border-botanical-100/80 rounded-2xl p-6 sm:p-8 shadow-soft-sm transition-all duration-300 ${
        hoverEffect ? 'hover:shadow-soft-md hover:-translate-y-1 hover:border-botanical-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
