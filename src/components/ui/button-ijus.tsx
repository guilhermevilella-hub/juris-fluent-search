import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonIjusVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "btn-ijus",
        outline: "btn-ijus-outline", 
        ghost: "btn-ijus-ghost",
        icon: "btn-ijus-icon",
      },
      size: {
        default: "h-12 px-5 rounded-xl [&_svg]:size-5",
        sm: "h-10 px-4 rounded-lg text-sm [&_svg]:size-4",
        lg: "h-14 px-6 rounded-xl text-lg [&_svg]:size-6",
        icon: "size-11 rounded-full p-0 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonIjusProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonIjusVariants> {
  asChild?: boolean;
}

const ButtonIjus = React.forwardRef<HTMLButtonElement, ButtonIjusProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonIjusVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
ButtonIjus.displayName = "ButtonIjus";

// Icon with microanimation helper component
export const IjusIcon = ({ children, className = "" }: { 
  children: React.ReactNode; 
  className?: string; 
}) => (
  <span className={cn("inline-block transition-transform group-hover:translate-x-1", className)}>
    {children}
  </span>
);

export { ButtonIjus, buttonIjusVariants };