import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardCleanVariants = cva(
  "rounded-xl border bg-card text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-card-border shadow-card hover:shadow-md",
        elevated: "border-card-border shadow-lg hover:shadow-xl",
        flat: "border-card-border shadow-none hover:shadow-card",
      },
      hover: {
        default: "hover:border-primary/20",
        lift: "hover:-translate-y-1 hover:shadow-lg",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "default",
    },
  }
);

// Main Card Component
export interface CardCleanProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardCleanVariants> {}

const CardClean = React.forwardRef<HTMLDivElement, CardCleanProps>(
  ({ className, variant, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardCleanVariants({ variant, hover }), className)}
      {...props}
    />
  )
);
CardClean.displayName = "CardClean";

// Card Header
const CardCleanHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardCleanHeader.displayName = "CardCleanHeader";

// Card Title with Icon Support
interface CardCleanTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  icon?: React.ElementType;
}

const CardCleanTitle = React.forwardRef<HTMLParagraphElement, CardCleanTitleProps>(
  ({ className, icon: Icon, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "flex items-center gap-2 text-lg font-semibold leading-none tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 text-primary" />}
      {children}
    </h3>
  )
);
CardCleanTitle.displayName = "CardCleanTitle";

// Card Description
const CardCleanDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
CardCleanDescription.displayName = "CardCleanDescription";

// Card Content
const CardCleanContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardCleanContent.displayName = "CardCleanContent";

// Card Footer
const CardCleanFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardCleanFooter.displayName = "CardCleanFooter";

// Stat Card Component
interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle?: string;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, icon: Icon, title, value, subtitle, ...props }, ref) => (
    <CardClean ref={ref} variant="flat" hover="lift" className={cn("p-6", className)} {...props}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </CardClean>
  )
);
StatCard.displayName = "StatCard";

// Activity Card Component
interface ActivityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType;
  title: string;
  process: string;
  tribunal: string;
  datetime: string;
  status?: "new" | "read";
  onAction?: () => void;
}

const ActivityCard = React.forwardRef<HTMLDivElement, ActivityCardProps>(
  ({ 
    className, 
    icon: Icon, 
    title, 
    process, 
    tribunal, 
    datetime, 
    status, 
    onAction,
    ...props 
  }, ref) => (
    <CardClean 
      ref={ref} 
      variant="flat" 
      hover="default" 
      className={cn("p-4 cursor-pointer", className)} 
      onClick={onAction}
      {...props}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-medium text-foreground line-clamp-2">{title}</h4>
            {status === "new" && (
              <span className="bg-status-new/10 text-status-new text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                Nova
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{process}</span>
            <span>•</span>
            <span>{tribunal}</span>
            <span>•</span>
            <span>{datetime}</span>
          </div>
        </div>
      </div>
    </CardClean>
  )
);
ActivityCard.displayName = "ActivityCard";

export {
  CardClean,
  CardCleanHeader,
  CardCleanTitle,
  CardCleanDescription,
  CardCleanContent,
  CardCleanFooter,
  StatCard,
  ActivityCard,
};