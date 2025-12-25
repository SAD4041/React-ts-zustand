import { Target, Heart, Award } from 'lucide-react';

export type ValueItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

export const aboutValues: ValueItem[] = [
  {
    icon: Award,
    title: 'تعهد به برتری',
    description: 'همیشه در تلاش برای ارائه بهترین خدمات و محصولات هستیم',
  },
  {
    icon: Target,
    title: 'تمرکز بر کیفیت',
    description: 'ما به کیفیت بالا و جزئیات دقیق در تمام پروژه‌ها متعهد هستیم',
  },
  {
    icon: Heart,
    title: 'مشتری محوری',
    description: 'رضایت شما اولویت اول ماست و همیشه در کنار شما خواهیم بود',
  },
];