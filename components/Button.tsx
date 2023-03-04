import Link from 'next/link';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import GradientWrapper from './GradientWrapper';

const styles = {
  primary:
    'relative inline-flex items-center rounded-full border border-solid border-transparent bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 text-white duration-200 ease-in-out hover:from-blue-600 hover:to-purple-600 hover:text-white focus:border-blue-800 focus:outline-none active:bg-blue-800',
  secondary:
    'relative inline-flex items-center rounded-md border border-solid border-slate-300 bg-white px-4 py-2 text-slate-500 duration-200 ease-in-out hover:border-slate-700 hover:text-slate-800 focus:border-slate-700 active:border-slate-700 active:bg-slate-50 active:text-slate-800',
  tertiary:
    'relative inline-flex items-center rounded-md bg-white px-4 py-2 text-slate-700 duration-200 ease-in-out hover:text-slate-500 focus:border-blue-300 active:bg-slate-50 active:text-slate-800',
  gradient:
    'relative gradient-button inline-flex items-center rounded-full border border-solid border-transparent px-6 py-3 text-white duration-200 ease-in-out  hover:text-white focus:border-purple-800 focus:outline-none',
};

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'gradient';
  href?: string;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (any) => Promise<void>;
}

export default function Button({ variant = 'primary', className, href, ...props }: ButtonProps) {
  className = cn(styles[variant], className);

  return href ? (
    <GradientWrapper>
      <Link href={href} className={className} {...props} />
    </GradientWrapper>
  ) : (
    <GradientWrapper>
      <button className={className} {...props} />
    </GradientWrapper>
  );
}
