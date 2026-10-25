import React from 'react';

export default function Container({
  children,
  size = 'default',
  className = '',
  ...props
}) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[90rem]',
    full: 'max-w-full',
  }[size] || 'max-w-7xl';

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
