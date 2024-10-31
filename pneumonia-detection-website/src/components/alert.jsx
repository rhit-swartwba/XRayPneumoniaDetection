import React from "react";
import { AlertCircle } from "lucide-react";

const alertVariants = (variant) => {
  const baseClasses = "relative w-full rounded-lg border p-4";
  const svgClasses = "[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4";
  
  const variantClasses = {
    default: "bg-background text-foreground",
    destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
  };

  return `${baseClasses} ${svgClasses} ${variantClasses[variant || "default"]}`;
};

const Alert = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    role="alert"
    className={alertVariants(props.variant)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef((props, ref) => (
  <h5
    ref={ref}
    className="mb-1 font-medium leading-none tracking-tight"
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    className="text-sm [&_p]:leading-relaxed"
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
