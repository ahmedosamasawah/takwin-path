import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, BookOpen, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { uloomData } from '@/data/mockData';
import { DiagnosticResult } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface DiagnosticResultsStepProps {
  selectedUloom: string[];
  diagnosticResults: DiagnosticResult[];
  onUpdateSkipDecision: (ilmId: string, matnId: string, skip: boolean) => void;
  onComplete: () => void;
  onBack: () => void;
}

export const DiagnosticResultsStep: React.FC<DiagnosticResultsStepProps> = ({
  selectedUloom,
  diagnosticResults,
  onUpdateSkipDecision,
  onComplete,
  onBack
}) => {
  const [expandedIlms, setExpandedIlms] = React.useState<string[]>(
    diagnosticResults.map(r => r.ilmId)
  );

  const relevantUloom = uloomData.filter(u => selectedUloom.includes(u.id));

  const toggleExpanded = (ilmId: string) => {
    setExpandedIlms(prev => 
      prev.includes(ilmId) 
        ? prev.filter(id => id !== ilmId)
        : [...prev, ilmId]
    );
  };

  if (diagnosticResults.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-4">
            لم تخضع لأي اختبارات
          </h1>
          <p className="text-muted-foreground mb-8">
            سيتم إنشاء منهجك مع جميع المتون للدراسة.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={onBack}>
              رجوع
            </Button>
            <Button variant="hero" onClick={onComplete}>
              إنشاء المنهج
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            نتائج الاختبارات التشخيصية
          </h1>
          <p className="text-muted-foreground text-lg">
            راجع نتائجك وحدد ما ترغب في تجاوزه أو دراسته
          </p>
        </motion.div>

        <div className="space-y-6">
          {diagnosticResults.map((result, resultIndex) => {
            const ilm = relevantUloom.flatMap(u => u.ilms).find(i => i.id === result.ilmId);
            const uloom = relevantUloom.find(u => u.ilms.some(i => i.id === result.ilmId));
            if (!ilm || !uloom) return null;

            const isExpanded = expandedIlms.includes(result.ilmId);
            const skipEligibleCount = result.matnResults.filter(mr => mr.skipEligible).length;
            const totalMatns = result.matnResults.length;

            return (
              <motion.div
                key={result.ilmId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * resultIndex }}
                className="card-elevated rounded-xl overflow-hidden"
              >
                <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(result.ilmId)}>
                  <CollapsibleTrigger className="w-full p-6 text-right">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{uloom.icon}</span>
                        <div>
                          <h2 className="text-xl font-bold">{ilm.name}</h2>
                          <div className="flex items-center gap-4 mt-1">
                            <span className={cn(
                              "text-sm font-medium",
                              result.overallScore >= 85 ? "text-success" : "text-muted-foreground"
                            )}>
                              {result.overallScore.toFixed(0)}% معدل عام
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {skipEligibleCount} من {totalMatns} متون قابلة للتجاوز
                            </span>
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="px-6 pb-6 space-y-3">
                      {result.matnResults.map((matnResult, matnIndex) => {
                        const matn = ilm.matns.find(m => m.id === matnResult.matnId);
                        if (!matn) return null;

                        return (
                          <motion.div
                            key={matnResult.matnId}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.05 * matnIndex }}
                            className={cn(
                              "p-4 rounded-lg border",
                              matnResult.skipEligible ? "bg-success/5 border-success/20" : "bg-muted/50 border-border"
                            )}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3 flex-1">
                                <div className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                                  matnResult.skipEligible ? "bg-success/10" : "bg-muted"
                                )}>
                                  {matnResult.skipEligible ? (
                                    <Check className="h-5 w-5 text-success" />
                                  ) : (
                                    <X className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{matn.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {matnResult.correctAnswers} من {matnResult.totalQuestions} صحيحة
                                    <span className={cn(
                                      "mr-2 font-medium",
                                      matnResult.skipEligible ? "text-success" : "text-destructive"
                                    )}>
                                      ({matnResult.score.toFixed(0)}%)
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                {matnResult.skipEligible ? (
                                  <>
                                    <span className="text-sm text-muted-foreground">
                                      تجاوز
                                    </span>
                                    <Switch
                                      checked={matnResult.userWantsToSkip}
                                      onCheckedChange={(checked) => 
                                        onUpdateSkipDecision(result.ilmId, matnResult.matnId, checked)
                                      }
                                    />
                                  </>
                                ) : (
                                  <span className="text-sm text-destructive">
                                    يجب دراسته
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            );
          })}
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
          <Button
            variant="hero"
            size="lg"
            onClick={onComplete}
            className="group"
          >
            <span>إنشاء المنهج</span>
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
