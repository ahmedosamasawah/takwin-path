import React from 'react';
import { motion } from 'framer-motion';
import { Check, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  onGoHome?: () => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  onGoHome
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Home button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onGoHome}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground shrink-0"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">الرئيسية</span>
          </Button>

          {/* Progress steps */}
          <div className="flex items-center justify-center flex-1">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;

              return (
                <React.Fragment key={step}>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: isCurrent ? 1.1 : 1 }}
                      className={cn(
                        "w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-colors",
                        isCompleted && "bg-primary text-primary-foreground",
                        isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                        !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        index + 1
                      )}
                    </motion.div>
                    <span className={cn(
                      "hidden lg:block text-sm",
                      isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                    )}>
                      {step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-4 sm:w-8 h-0.5 mx-1 sm:mx-2",
                      isCompleted ? "bg-primary" : "bg-border"
                    )} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Theme toggle */}
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
