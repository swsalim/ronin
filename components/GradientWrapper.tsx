import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function GradientWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  className = cn('relative inline-flex mt-10 group', className);

  return (
    <div className={className}>
      <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
      {children}
    </div>
  );
}
