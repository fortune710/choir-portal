"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
        onValueChange?: (value: number) => void
    }
>(({ className, value, onValueChange, ...props }, ref) => {
    // Validate the value to ensure it's a valid number or null/undefined
    const validValue = React.useMemo(() => {
        // If value is null or undefined, return null (indeterminate state)
        if (value === null || value === undefined) {
            return null;
        }

        // Convert to number and check if it's NaN
        const numValue = Number(value);
        if (isNaN(numValue)) {
            return null;
        }

        // Ensure the value is a positive number
        return Math.max(0, numValue);
    }, [value]);

    // Call onValueChange when value changes
    React.useEffect(() => {
        if (onValueChange && validValue !== null) {
            onValueChange(validValue);
        }
    }, [validValue, onValueChange]);

    return (
        <ProgressPrimitive.Root
            ref={ref}
            className={cn(
                "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
                className
            )}
            value={validValue}
            {...props}
        >
            <ProgressPrimitive.Indicator
                className="h-full w-full flex-1 bg-primary transition-all"
                style={{ transform: `translateX(-${100 - (validValue || 0)}%)` }}
            />
        </ProgressPrimitive.Root>
    );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
