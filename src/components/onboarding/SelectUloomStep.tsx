import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uloomData } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface SelectUloomStepProps {
  selectedUloom: string[];
  existingManhajUloom?: string[];
  onSelect: (uloomIds: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SelectUloomStep: React.FC<SelectUloomStepProps> = ({
  selectedUloom,
  existingManhajUloom = [],
  onSelect,
  onNext,
  onBack
}) => {
  const [selected, setSelected] = useState<string[]>(selectedUloom);

  const toggleUloom = (id: string) => {
    if (existingManhajUloom.includes(id)) return;
    
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(u => u !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    onSelect(selected);
    onNext();
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            اختر العلوم التي تريد دراستها
          </h1>
          <p className="text-muted-foreground text-lg">
            حدد المجالات العلمية التي ترغب في بناء منهج دراسي لها
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {uloomData.map((uloom, index) => {
            const isSelected = selected.includes(uloom.id);
            const hasExistingManhaj = existingManhajUloom.includes(uloom.id);

            return (
              <motion.div
                key={uloom.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <button
                  onClick={() => toggleUloom(uloom.id)}
                  disabled={hasExistingManhaj}
                  className={cn(
                    "w-full p-6 rounded-xl border-2 text-right transition-all duration-300",
                    hasExistingManhaj && "opacity-50 cursor-not-allowed bg-muted",
                    !hasExistingManhaj && isSelected && "border-primary bg-primary/5 shadow-lg shadow-primary/10",
                    !hasExistingManhaj && !isSelected && "border-border hover:border-primary/50 hover:bg-card"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{uloom.icon}</span>
                        <h3 className="text-xl font-bold">{uloom.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {uloom.description}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {uloom.ilms.length} علوم فرعية
                      </p>
                      {hasExistingManhaj && (
                        <span className="inline-block mt-2 px-2 py-1 bg-success/10 text-success text-xs rounded">
                          لديك منهج مسبق
                        </span>
                      )}
                    </div>
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                      isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                    )}>
                      {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center justify-between"
        >
          <Button variant="ghost" onClick={onBack}>
            رجوع
          </Button>
          <Button
            variant="hero"
            size="lg"
            onClick={handleNext}
            disabled={selected.length === 0}
            className="group"
          >
            <span>التالي</span>
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
