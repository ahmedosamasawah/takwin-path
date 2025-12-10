import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Check, Clock, SkipForward, Play, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { uloomData, Matn } from '@/data/mockData';
import { ManhadjEntry, useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';

interface ManhadjDashboardProps {
  onAddManhaj: () => void;
}

export const ManhadjDashboard: React.FC<ManhadjDashboardProps> = ({ onAddManhaj }) => {
  const { state, startStudyingMatn, studySkippedMatn } = useOnboarding();
  const [expandedUloom, setExpandedUloom] = React.useState<string[]>(
    [...new Set(state.manhaj.map(m => m.uloomId))]
  );

  const toggleExpanded = (uloomId: string) => {
    setExpandedUloom(prev => 
      prev.includes(uloomId) 
        ? prev.filter(id => id !== uloomId)
        : [...prev, uloomId]
    );
  };

  // Group manhaj entries by uloom
  const groupedManhaj = state.manhaj.reduce((acc, entry) => {
    if (!acc[entry.uloomId]) {
      acc[entry.uloomId] = [];
    }
    acc[entry.uloomId].push(entry);
    return acc;
  }, {} as Record<string, ManhadjEntry[]>);

  const uloomWithManhaj = Object.keys(groupedManhaj);
  const uloomWithoutManhaj = uloomData.filter(u => !uloomWithManhaj.includes(u.id));

  const getStatusIcon = (status: ManhadjEntry['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-success" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-accent" />;
      case 'skipped':
        return <SkipForward className="h-4 w-4 text-muted-foreground" />;
      default:
        return <BookOpen className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: ManhadjEntry['status']) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'in_progress': return 'قيد الدراسة';
      case 'skipped': return 'تم تجاوزه';
      default: return 'لم يبدأ';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {uloomWithoutManhaj.length > 0 && (
              <Button variant="outline" onClick={onAddManhaj} className="gap-2">
                <Plus className="h-4 w-4" />
                إضافة منهج
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">منهجك الدراسي</h1>
          <p className="text-muted-foreground">
            تابع تقدمك في العلوم الشرعية المختلفة
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 md:grid-cols-4 mb-8"
        >
          {[
            { label: 'إجمالي المتون', value: state.manhaj.length, color: 'primary' },
            { label: 'مكتملة', value: state.manhaj.filter(m => m.status === 'completed').length, color: 'success' },
            { label: 'قيد الدراسة', value: state.manhaj.filter(m => m.status === 'in_progress').length, color: 'accent' },
            { label: 'تم تجاوزها', value: state.manhaj.filter(m => m.status === 'skipped').length, color: 'muted' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="card-elevated rounded-xl p-5"
            >
              <div className={cn(
                "text-3xl font-bold mb-1",
                stat.color === 'primary' && "text-primary",
                stat.color === 'success' && "text-success",
                stat.color === 'accent' && "text-accent",
                stat.color === 'muted' && "text-muted-foreground"
              )}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Manhaj by Uloom */}
        <div className="space-y-6">
          {uloomWithManhaj.map((uloomId, uloomIndex) => {
            const uloom = uloomData.find(u => u.id === uloomId);
            if (!uloom) return null;

            const entries = groupedManhaj[uloomId];
            const isExpanded = expandedUloom.includes(uloomId);

            // Group entries by Ilm
            const entriesByIlm = entries.reduce((acc, entry) => {
              if (!acc[entry.ilmId]) {
                acc[entry.ilmId] = [];
              }
              acc[entry.ilmId].push(entry);
              return acc;
            }, {} as Record<string, ManhadjEntry[]>);

            const completedCount = entries.filter(e => e.status === 'completed').length;
            const totalNonSkipped = entries.filter(e => e.status !== 'skipped').length;
            const progress = totalNonSkipped > 0 ? (completedCount / totalNonSkipped) * 100 : 0;

            return (
              <motion.div
                key={uloomId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + uloomIndex * 0.1 }}
                className="card-elevated rounded-xl overflow-hidden"
              >
                <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(uloomId)}>
                  <CollapsibleTrigger className="w-full p-6 text-right hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{uloom.icon}</span>
                        <div>
                          <h2 className="text-xl font-bold">{uloom.name}</h2>
                          <div className="flex items-center gap-4 mt-2">
                            <Progress value={progress} className="w-32 h-2" />
                            <span className="text-sm text-muted-foreground">
                              {completedCount} من {totalNonSkipped} مكتمل
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
                    <div className="px-6 pb-6 space-y-6">
                      {Object.entries(entriesByIlm).map(([ilmId, ilmEntries]) => {
                        const ilm = uloom.ilms.find(i => i.id === ilmId);
                        if (!ilm) return null;

                        return (
                          <div key={ilmId} className="border-t border-border pt-4">
                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-primary" />
                              {ilm.name}
                            </h3>
                            <div className="grid gap-3 md:grid-cols-2">
                              {ilmEntries.map((entry) => {
                                const matn = ilm.matns.find(m => m.id === entry.matnId);
                                if (!matn) return null;

                                return (
                                  <div
                                    key={entry.matnId}
                                    className={cn(
                                      "p-4 rounded-lg border transition-all",
                                      entry.status === 'completed' && "bg-success/5 border-success/20",
                                      entry.status === 'in_progress' && "bg-accent/5 border-accent/20",
                                      entry.status === 'skipped' && "bg-muted/50 border-border opacity-60",
                                      entry.status === 'pending' && "bg-card border-border hover:border-primary/50"
                                    )}
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="flex items-start gap-3 flex-1">
                                        <div className={cn(
                                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                          entry.status === 'completed' && "bg-success/10",
                                          entry.status === 'in_progress' && "bg-accent/10",
                                          entry.status === 'skipped' && "bg-muted",
                                          entry.status === 'pending' && "bg-muted"
                                        )}>
                                          {getStatusIcon(entry.status)}
                                        </div>
                                        <div className="flex-1">
                                          <div className="font-medium">{matn.name}</div>
                                          <div className="text-xs text-muted-foreground mt-1">
                                            {matn.lessonsCount} درس · {matn.questionsCount} سؤال
                                          </div>
                                          <div className={cn(
                                            "inline-block mt-2 text-xs px-2 py-0.5 rounded",
                                            entry.status === 'completed' && "bg-success/10 text-success",
                                            entry.status === 'in_progress' && "bg-accent/10 text-accent",
                                            entry.status === 'skipped' && "bg-muted text-muted-foreground",
                                            entry.status === 'pending' && "bg-muted text-muted-foreground"
                                          )}>
                                            {getStatusLabel(entry.status)}
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        {entry.status === 'pending' && (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => startStudyingMatn(entry.matnId)}
                                            className="gap-1"
                                          >
                                            <Play className="h-3 w-3" />
                                            ابدأ
                                          </Button>
                                        )}
                                        {entry.status === 'skipped' && (
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => studySkippedMatn(entry.matnId)}
                                            className="text-xs"
                                          >
                                            ادرسه
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            );
          })}
        </div>

        {uloomWithManhaj.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">لا يوجد منهج حالياً</h2>
            <p className="text-muted-foreground mb-8">
              ابدأ رحلتك التعليمية بإنشاء منهج دراسي مخصص لك
            </p>
            <Button variant="hero" size="lg" onClick={onAddManhaj}>
              <Plus className="h-5 w-5 ml-2" />
              إنشاء منهج جديد
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
};
