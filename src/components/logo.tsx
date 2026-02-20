import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 60"
      className={cn("h-8 w-auto", className)}
    >
      <title>Elysian Threads Logo</title>
      <text
        x="0"
        y="45"
        fontFamily="'Garamond', 'Times New Roman', serif"
        fontSize="50"
        fontWeight="bold"
        fill="currentColor"
        letterSpacing="2"
      >
        E
        <tspan
          fontFamily="'Helvetica Neue', 'Arial', sans-serif"
          fontWeight="300"
          letterSpacing="-2"
        >
          T
        </tspan>
      </text>
    </svg>
  );
}
