import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <React.Fragment key={step}>
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isCurrent ? 1.1 : 1 }}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                      isCompleted && "bg-primary text-primary-foreground",
                      isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                      !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </motion.div>
                  <span className={cn(
                    "hidden md:block text-sm",
                    isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                  )}>
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-2",
                    isCompleted ? "bg-primary" : "bg-border"
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
