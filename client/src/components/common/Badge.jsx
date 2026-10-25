import React from 'react';

const VARIANTS = {
  botanical: 'bg-botanical-100 text-botanical-800 border-botanical-200',
  vermilion: 'bg-vermilion-50 text-vermilion-700 border-vermilion-200',
  warm: 'bg-warm-200 text-earth-800 border-warm-300',
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  outline: 'bg-transparent text-botanical-700 border-botanical-300',
};

export default function Badge({
  children,
  variant = 'botanical',
  dot = false,
  dotColor = 'bg-botanical-500',
  className = '',
}) {
  const variantStyle = VARIANTS[variant] || VARIANTS.botanical;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border tracking-wide font-sans ${variantStyle} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor} animate-pulse`} />}
      {children}
    </span>
  );
}
