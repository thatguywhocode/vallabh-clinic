import React from 'react';

const VARIANTS = {
  primary: 'bg-botanical-500 text-warm-50 hover:bg-botanical-600 active:bg-botanical-700 shadow-soft-sm focus:ring-botanical-400 border border-transparent',
  vermilion: 'bg-vermilion-500 text-white hover:bg-vermilion-600 active:bg-vermilion-700 shadow-soft-sm focus:ring-vermilion-300 border border-transparent',
  outline: 'border border-botanical-500 text-botanical-700 hover:bg-botanical-50 focus:ring-botanical-400 bg-transparent',
  secondary: 'bg-warm-200 text-earth-800 hover:bg-warm-300 focus:ring-warm-400 border border-warm-300',
  ghost: 'text-botanical-800 hover:bg-botanical-50/60 focus:ring-botanical-400 bg-transparent',
};

const SIZES = {
  sm: 'px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-full',
  md: 'px-5 py-2.5 text-sm font-medium tracking-wide rounded-full',
  lg: 'px-7 py-3.5 text-base font-semibold tracking-wide rounded-full',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon = null,
  iconPosition = 'left',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const variantStyles = VARIANTS[variant] || VARIANTS.primary;
  const sizeStyles = SIZES[size] || SIZES.md;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-sans transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
