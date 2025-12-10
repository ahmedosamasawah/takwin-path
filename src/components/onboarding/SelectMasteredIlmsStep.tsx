import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uloomData, Ilm } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface SelectMasteredIlmsStepProps {
  selectedUloom: string[];
  claimedMasteredIlms: string[];
  onSelect: (ilmIds: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SelectMasteredIlmsStep: React.FC<SelectMasteredIlmsStepProps> = ({
  selectedUloom,
  claimedMasteredIlms,
  onSelect,
  onNext,
  onBack
}) => {
  const [selected, setSelected] = useState<string[]>(claimedMasteredIlms);

  const relevantUloom = uloomData.filter(u => selectedUloom.includes(u.id));

  const toggleIlm = (id: string) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    onSelect(selected);
    onNext();
  };

  const handleSkip = () => {
    onSelect([]);
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
            ما الذي تعرفه مسبقاً؟
          </h1>
          <p className="text-muted-foreground text-lg">
            اختر العلوم التي تعتقد أنك أتقنتها وترغب في اختبار تجاوزها
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            إذا لم تكن متأكداً، يمكنك تخطي هذه الخطوة
          </p>
        </motion.div>

        <div className="space-y-8">
          {relevantUloom.map((uloom, uloomIndex) => (
            <motion.div
              key={uloom.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * uloomIndex }}
              className="card-elevated rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{uloom.icon}</span>
                <h2 className="text-xl font-bold">{uloom.name}</h2>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {uloom.ilms.map((ilm, ilmIndex) => {
                  const isSelected = selected.includes(ilm.id);

                  return (
                    <motion.button
                      key={ilm.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * uloomIndex + 0.05 * ilmIndex }}
                      onClick={() => toggleIlm(ilm.id)}
                      className={cn(
                        "p-4 rounded-lg border text-right transition-all duration-200",
                        isSelected 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold">{ilm.name}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {ilm.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {ilm.matns.length} متون
                          </p>
                        </div>
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0",
                          isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                        )}>
                          {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center justify-between"
        >
          <Button variant="ghost" onClick={onBack}>
            رجوع
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSkip}>
              تخطي هذه الخطوة
            </Button>
            <Button
              variant="hero"
              size="lg"
              onClick={handleNext}
              className="group"
            >
              <span>{selected.length > 0 ? 'ابدأ الاختبار' : 'التالي'}</span>
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
