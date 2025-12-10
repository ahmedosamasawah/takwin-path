import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { uloomData, generateQuestionsForIlm, Question } from '@/data/mockData';
import { DiagnosticResult } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';

interface DiagnosticExamStepProps {
  selectedUloom: string[];
  claimedMasteredIlms: string[];
  onComplete: (results: DiagnosticResult[]) => void;
  onBack: () => void;
}

export const DiagnosticExamStep: React.FC<DiagnosticExamStepProps> = ({
  selectedUloom,
  claimedMasteredIlms,
  onComplete,
  onBack
}) => {
  const relevantUloom = uloomData.filter(u => selectedUloom.includes(u.id));
  const ilmsToTest = relevantUloom.flatMap(u => 
    u.ilms.filter(ilm => claimedMasteredIlms.includes(ilm.id))
  );

  const [currentIlmIndex, setCurrentIlmIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, number[]>>(new Map());
  const [results, setResults] = useState<DiagnosticResult[]>([]);

  const currentIlm = ilmsToTest[currentIlmIndex];
  const questions = useMemo(() => 
    currentIlm ? generateQuestionsForIlm(currentIlm.id) : [],
    [currentIlm?.id]
  );
  const currentQuestion = questions[currentQuestionIndex];

  const progress = ((currentIlmIndex * 100 + (currentQuestionIndex / questions.length) * 100) / ilmsToTest.length);

  const handleAnswer = (optionIndex: number) => {
    if (!currentQuestion) return;

    setAnswers(prev => {
      const newAnswers = new Map(prev);
      const currentAnswer = newAnswers.get(currentQuestion.id) || [];
      
      if (currentQuestion.type === 'multiple') {
        if (currentAnswer.includes(optionIndex)) {
          newAnswers.set(currentQuestion.id, currentAnswer.filter(i => i !== optionIndex));
        } else {
          newAnswers.set(currentQuestion.id, [...currentAnswer, optionIndex]);
        }
      } else {
        newAnswers.set(currentQuestion.id, [optionIndex]);
      }
      
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate results for this Ilm
      const matnResults = currentIlm.matns.map(matn => {
        const matnQuestions = questions.filter(q => q.matnId === matn.id);
        let correct = 0;
        
        matnQuestions.forEach(q => {
          const userAnswer = answers.get(q.id) || [];
          const isCorrect = 
            userAnswer.length === q.correctAnswers.length &&
            userAnswer.every(a => q.correctAnswers.includes(a));
          if (isCorrect) correct++;
        });

        const score = matnQuestions.length > 0 ? (correct / matnQuestions.length) * 100 : 0;
        
        return {
          matnId: matn.id,
          score,
          totalQuestions: matnQuestions.length,
          correctAnswers: correct,
          skipEligible: score >= 85,
          userWantsToSkip: score >= 85 // Default to skip if eligible
        };
      });

      const overallScore = matnResults.reduce((acc, mr) => acc + mr.score, 0) / matnResults.length;

      const newResult: DiagnosticResult = {
        ilmId: currentIlm.id,
        matnResults,
        overallScore
      };

      const updatedResults = [...results, newResult];
      setResults(updatedResults);

      if (currentIlmIndex < ilmsToTest.length - 1) {
        setCurrentIlmIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
        setAnswers(new Map());
      } else {
        onComplete(updatedResults);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  const currentAnswer = answers.get(currentQuestion.id) || [];
  const canProceed = currentAnswer.length > 0;

  const uloom = relevantUloom.find(u => u.ilms.some(i => i.id === currentIlm.id));

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{uloom?.icon}</span>
            <div>
              <div className="text-sm text-muted-foreground">اختبار</div>
              <div className="font-bold text-lg">{currentIlm.name}</div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>علم {currentIlmIndex + 1} من {ilmsToTest.length}</span>
            <span>سؤال {currentQuestionIndex + 1} من {questions.length}</span>
          </div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card-elevated rounded-xl p-6 md:p-8 mb-8"
          >
            <div className="mb-6">
              <span className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-medium mb-4",
                currentQuestion.type === 'boolean' && "bg-accent/10 text-accent",
                currentQuestion.type === 'single' && "bg-primary/10 text-primary",
                currentQuestion.type === 'multiple' && "bg-success/10 text-success"
              )}>
                {currentQuestion.type === 'boolean' && 'صح أو خطأ'}
                {currentQuestion.type === 'single' && 'اختر إجابة واحدة'}
                {currentQuestion.type === 'multiple' && 'اختر جميع الإجابات الصحيحة'}
              </span>
              <h2 className="text-xl font-bold">{currentQuestion.text}</h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = currentAnswer.includes(index);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 text-right transition-all duration-200 flex items-center justify-between",
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <span>{option}</span>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0",
                      isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                    )}>
                      {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={currentQuestionIndex > 0 ? handlePrev : onBack}
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            {currentQuestionIndex > 0 ? 'السؤال السابق' : 'رجوع'}
          </Button>
          <Button
            variant="hero"
            onClick={handleNext}
            disabled={!canProceed}
          >
            <span>
              {currentQuestionIndex < questions.length - 1 
                ? 'التالي' 
                : currentIlmIndex < ilmsToTest.length - 1 
                  ? 'العلم التالي'
                  : 'إنهاء الاختبار'}
            </span>
            <ArrowLeft className="h-4 w-4 mr-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
