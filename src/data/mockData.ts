export interface Matn {
  id: string;
  name: string;
  description: string;
  lessonsCount: number;
  questionsCount: number;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
}

export interface Ilm {
  id: string;
  name: string;
  description: string;
  matns: Matn[];
}

export interface Uloom {
  id: string;
  name: string;
  description: string;
  icon: string;
  ilms: Ilm[];
  hasManhadj?: boolean;
}

export const uloomData: Uloom[] = [
  {
    id: 'aqidah',
    name: 'العقيدة',
    description: 'دراسة أصول الإيمان والتوحيد وأركان الإسلام',
    icon: '🕌',
    ilms: [
      {
        id: 'tawheed',
        name: 'التوحيد',
        description: 'علم توحيد الله تعالى في ربوبيته وألوهيته وأسمائه وصفاته',
        matns: [
          { id: 'tawheed-1', name: 'كتاب التوحيد', description: 'للإمام محمد بن عبد الوهاب', lessonsCount: 24, questionsCount: 120, status: 'pending' },
          { id: 'tawheed-2', name: 'العقيدة الواسطية', description: 'لشيخ الإسلام ابن تيمية', lessonsCount: 18, questionsCount: 90, status: 'pending' },
          { id: 'tawheed-3', name: 'لمعة الاعتقاد', description: 'للإمام ابن قدامة المقدسي', lessonsCount: 12, questionsCount: 60, status: 'pending' },
        ]
      },
      {
        id: 'asma-sifat',
        name: 'الأسماء والصفات',
        description: 'دراسة أسماء الله الحسنى وصفاته العلى',
        matns: [
          { id: 'asma-1', name: 'شرح أسماء الله الحسنى', description: 'للشيخ السعدي', lessonsCount: 20, questionsCount: 100, status: 'pending' },
          { id: 'asma-2', name: 'القواعد المثلى', description: 'للشيخ ابن عثيمين', lessonsCount: 15, questionsCount: 75, status: 'pending' },
        ]
      },
      {
        id: 'usul-din',
        name: 'أصول الدين',
        description: 'أصول العقيدة الإسلامية وأركان الإيمان',
        matns: [
          { id: 'usul-1', name: 'الأصول الثلاثة', description: 'للإمام محمد بن عبد الوهاب', lessonsCount: 8, questionsCount: 40, status: 'pending' },
          { id: 'usul-2', name: 'القواعد الأربع', description: 'للإمام محمد بن عبد الوهاب', lessonsCount: 6, questionsCount: 30, status: 'pending' },
        ]
      }
    ]
  },
  {
    id: 'fiqh',
    name: 'الفقه',
    description: 'أحكام العبادات والمعاملات في الشريعة الإسلامية',
    icon: '📜',
    ilms: [
      {
        id: 'ibadat',
        name: 'العبادات',
        description: 'أحكام الطهارة والصلاة والزكاة والصيام والحج',
        matns: [
          { id: 'ibadat-1', name: 'عمدة الفقه', description: 'للإمام ابن قدامة', lessonsCount: 30, questionsCount: 150, status: 'pending' },
          { id: 'ibadat-2', name: 'زاد المستقنع', description: 'للحجاوي', lessonsCount: 40, questionsCount: 200, status: 'pending' },
        ]
      },
      {
        id: 'muamalat',
        name: 'المعاملات',
        description: 'أحكام البيوع والعقود والمعاملات المالية',
        matns: [
          { id: 'muamalat-1', name: 'البيوع', description: 'من زاد المستقنع', lessonsCount: 25, questionsCount: 125, status: 'pending' },
        ]
      },
      {
        id: 'usul-fiqh',
        name: 'أصول الفقه',
        description: 'القواعد والأصول التي يستنبط منها الأحكام الشرعية',
        matns: [
          { id: 'usul-fiqh-1', name: 'الورقات', description: 'للإمام الجويني', lessonsCount: 12, questionsCount: 60, status: 'pending' },
          { id: 'usul-fiqh-2', name: 'الأصول من علم الأصول', description: 'للشيخ ابن عثيمين', lessonsCount: 20, questionsCount: 100, status: 'pending' },
        ]
      }
    ]
  },
  {
    id: 'hadith',
    name: 'الحديث',
    description: 'دراسة أحاديث النبي ﷺ وعلومها',
    icon: '📖',
    ilms: [
      {
        id: 'mustalah',
        name: 'مصطلح الحديث',
        description: 'علم أصول الرواية ومعرفة الصحيح من الضعيف',
        matns: [
          { id: 'mustalah-1', name: 'البيقونية', description: 'للإمام البيقوني', lessonsCount: 8, questionsCount: 40, status: 'pending' },
          { id: 'mustalah-2', name: 'نخبة الفكر', description: 'للحافظ ابن حجر', lessonsCount: 15, questionsCount: 75, status: 'pending' },
        ]
      },
      {
        id: 'mutun-hadith',
        name: 'متون الحديث',
        description: 'حفظ ودراسة الأحاديث النبوية',
        matns: [
          { id: 'mutun-1', name: 'الأربعون النووية', description: 'للإمام النووي', lessonsCount: 42, questionsCount: 210, status: 'pending' },
          { id: 'mutun-2', name: 'عمدة الأحكام', description: 'للحافظ عبد الغني المقدسي', lessonsCount: 35, questionsCount: 175, status: 'pending' },
          { id: 'mutun-3', name: 'بلوغ المرام', description: 'للحافظ ابن حجر', lessonsCount: 50, questionsCount: 250, status: 'pending' },
        ]
      }
    ]
  },
  {
    id: 'seerah',
    name: 'السيرة',
    description: 'دراسة سيرة النبي ﷺ وتاريخ الإسلام',
    icon: '🌙',
    ilms: [
      {
        id: 'seerah-nabawiyyah',
        name: 'السيرة النبوية',
        description: 'حياة النبي ﷺ من مولده إلى وفاته',
        matns: [
          { id: 'seerah-1', name: 'الرحيق المختوم', description: 'للشيخ صفي الرحمن المباركفوري', lessonsCount: 40, questionsCount: 200, status: 'pending' },
          { id: 'seerah-2', name: 'زاد المعاد', description: 'للإمام ابن القيم', lessonsCount: 60, questionsCount: 300, status: 'pending' },
        ]
      }
    ]
  },
  {
    id: 'quran',
    name: 'علوم القرآن',
    description: 'التفسير والتجويد وعلوم القرآن الكريم',
    icon: '📗',
    ilms: [
      {
        id: 'tafseer',
        name: 'التفسير',
        description: 'فهم معاني القرآن الكريم',
        matns: [
          { id: 'tafseer-1', name: 'تفسير السعدي', description: 'تيسير الكريم الرحمن', lessonsCount: 100, questionsCount: 500, status: 'pending' },
        ]
      },
      {
        id: 'tajweed',
        name: 'التجويد',
        description: 'أحكام تلاوة القرآن الكريم',
        matns: [
          { id: 'tajweed-1', name: 'تحفة الأطفال', description: 'للإمام الجمزوري', lessonsCount: 10, questionsCount: 50, status: 'pending' },
          { id: 'tajweed-2', name: 'الجزرية', description: 'للإمام ابن الجزري', lessonsCount: 15, questionsCount: 75, status: 'pending' },
        ]
      }
    ]
  },
  {
    id: 'arabic',
    name: 'اللغة العربية',
    description: 'النحو والصرف والبلاغة وعلوم اللغة',
    icon: '✍️',
    ilms: [
      {
        id: 'nahw',
        name: 'النحو',
        description: 'قواعد اللغة العربية وإعراب الكلمات',
        matns: [
          { id: 'nahw-1', name: 'الآجرومية', description: 'للإمام ابن آجروم', lessonsCount: 15, questionsCount: 75, status: 'pending' },
          { id: 'nahw-2', name: 'قطر الندى', description: 'لابن هشام', lessonsCount: 25, questionsCount: 125, status: 'pending' },
          { id: 'nahw-3', name: 'ألفية ابن مالك', description: 'للإمام ابن مالك', lessonsCount: 50, questionsCount: 250, status: 'pending' },
        ]
      },
      {
        id: 'sarf',
        name: 'الصرف',
        description: 'بناء الكلمات وتصريفها',
        matns: [
          { id: 'sarf-1', name: 'البناء والأساس', description: 'مبادئ علم الصرف', lessonsCount: 12, questionsCount: 60, status: 'pending' },
        ]
      }
    ]
  }
];

export interface Question {
  id: string;
  matnId: string;
  text: string;
  type: 'single' | 'multiple' | 'boolean';
  options: string[];
  correctAnswers: number[];
  explanation: string;
}

export const generateQuestionsForIlm = (ilmId: string): Question[] => {
  // Generate sample questions based on Ilm
  const questions: Question[] = [];
  const ilm = uloomData.flatMap(u => u.ilms).find(i => i.id === ilmId);
  
  if (!ilm) return [];

  ilm.matns.forEach((matn, matnIndex) => {
    // 3-5 questions per matn
    const numQuestions = 3 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numQuestions; i++) {
      questions.push({
        id: `${matn.id}-q${i}`,
        matnId: matn.id,
        text: `سؤال ${i + 1} من ${matn.name}: ما هو الحكم الصحيح في هذه المسألة؟`,
        type: i % 3 === 0 ? 'boolean' : i % 3 === 1 ? 'single' : 'multiple',
        options: i % 3 === 0 
          ? ['صحيح', 'خطأ']
          : ['الخيار الأول', 'الخيار الثاني', 'الخيار الثالث', 'الخيار الرابع'],
        correctAnswers: i % 3 === 0 ? [0] : i % 3 === 1 ? [1] : [0, 2],
        explanation: `الجواب الصحيح هو كذا لأن الدليل من الكتاب والسنة يدل على ذلك.`
      });
    }
  });

  return questions;
};
