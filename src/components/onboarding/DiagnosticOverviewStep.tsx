import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileQuestion, ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uloomData } from '@/data/mockData';

interface DiagnosticOverviewStepProps {
  selectedUloom: string[];
  claimedMasteredIlms: string[];
  onStart: () => void;
  onBack: () => void;
}

export const DiagnosticOverviewStep: React.FC<DiagnosticOverviewStepProps> = ({
  selectedUloom,
  claimedMasteredIlms,
  onStart,
  onBack
}) => {
  const relevantUloom = uloomData.filter(u => selectedUloom.includes(u.id));
  const ilmsToTest = relevantUloom.flatMap(u => 
    u.ilms.filter(ilm => claimedMasteredIlms.includes(ilm.id))
  );

  const totalQuestions = ilmsToTest.reduce((acc, ilm) => {
    // 3-5 questions per matn
    return acc + ilm.matns.length * 4; // Average of 4 questions per matn
  }, 0);

  const estimatedMinutes = Math.ceil(totalQuestions * 1.5); // ~1.5 min per question

  if (ilmsToTest.length === 0) {
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
            لا توجد اختبارات تشخيصية
          </h1>
          <p className="text-muted-foreground mb-8">
            لم تختر أي علوم تعتقد أنك أتقنتها. سننتقل مباشرة لبناء منهجك الدراسي.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={onBack}>
              رجوع
            </Button>
            <Button variant="hero" onClick={onStart}>
              بناء المنهج
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            نظرة عامة على الاختبارات
          </h1>
          <p className="text-muted-foreground text-lg">
            ستخضع لاختبارات تشخيصية في العلوم التي ادعيت إتقانها
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-4 md:grid-cols-2 mb-8"
        >
          <div className="card-elevated rounded-xl p-6 text-center">
            <FileQuestion className="h-8 w-8 mx-auto text-primary mb-3" />
            <div className="text-3xl font-bold text-primary">{totalQuestions}</div>
            <div className="text-sm text-muted-foreground">سؤال تقريباً</div>
          </div>
          <div className="card-elevated rounded-xl p-6 text-center">
            <Clock className="h-8 w-8 mx-auto text-accent mb-3" />
            <div className="text-3xl font-bold text-accent">{estimatedMinutes}</div>
            <div className="text-sm text-muted-foreground">دقيقة تقديرية</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated rounded-xl p-6 mb-8"
        >
          <h2 className="text-lg font-bold mb-4">العلوم التي ستُختبر فيها:</h2>
          <div className="space-y-3">
            {ilmsToTest.map((ilm, index) => {
              const uloom = relevantUloom.find(u => u.ilms.some(i => i.id === ilm.id));
              const questionsCount = ilm.matns.length * 4;

              return (
                <motion.div
                  key={ilm.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{uloom?.icon}</span>
                    <div>
                      <div className="font-medium">{ilm.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {ilm.matns.length} متون
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ~{questionsCount} أسئلة
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-accent/10 rounded-xl p-4 mb-8"
        >
          <p className="text-sm text-center">
            <strong>ملاحظة:</strong> يمكنك إعادة الاختبار مرتين كحد أقصى مع فترة انتظار بين المحاولات
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-between"
        >
          <Button variant="ghost" onClick={onBack}>
            رجوع
          </Button>
          <Button
            variant="hero"
            size="lg"
            onClick={onStart}
            className="group"
          >
            <span>ابدأ الاختبارات</span>
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
