import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Award, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  const features = [
    {
      icon: BookOpen,
      title: 'اختر مجالات دراستك',
      description: 'حدد العلوم الشرعية التي تريد التعمق فيها'
    },
    {
      icon: Target,
      title: 'اختبار تحديد المستوى',
      description: 'نختبر معرفتك السابقة لتخصيص مسارك'
    },
    {
      icon: Award,
      title: 'منهج مخصص لك',
      description: 'نبني لك خطة دراسية تناسب مستواك'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 islamic-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <Logo size="lg" />
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-4xl md:text-5xl font-bold text-foreground"
        >
          أهلاً بك في رحلة التعلم
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          سنساعدك في بناء منهج دراسي مخصص يناسب اهتماماتك ومستواك
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="card-elevated rounded-xl p-6 text-center"
            >
              <div className="mx-auto w-14 h-14 rounded-full gradient-primary flex items-center justify-center mb-4">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <Button
            variant="hero"
            size="xl"
            onClick={onStart}
            className="group"
          >
            <span>ابدأ الآن</span>
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
