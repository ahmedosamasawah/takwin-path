import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border">
        <Logo size="md" linkTo="/" />
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center py-16 sm:py-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm font-medium">منصة التعليم الإسلامي</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              ابدأ رحلتك في{' '}
              <span className="bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
                طلب العلم
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              منصة تكوين تساعدك على بناء منهج دراسي مخصص لك، بناءً على معرفتك السابقة وأهدافك
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/onboarding">
                <Button variant="hero" size="lg" className="gap-2">
                  <span>ابدأ الآن</span>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2">
                <BookOpen className="w-5 h-5" />
                <span>تعرف على المنصة</span>
              </Button>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {[
              {
                title: 'منهج مخصص',
                description: 'نبني لك منهجاً دراسياً يناسب مستواك وأهدافك',
                icon: '📚',
              },
              {
                title: 'اختبارات تشخيصية',
                description: 'نحدد معرفتك السابقة لتجاوز ما تتقنه',
                icon: '✅',
              },
              {
                title: 'تتبع التقدم',
                description: 'تابع تقدمك في كل علم ومتن بسهولة',
                icon: '📈',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Home;
