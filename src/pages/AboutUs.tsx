// src/pages/AboutUs.tsx

// Hero
import heroUrl from "../assets/about_us/hero.webp";

// Icons (SVG as URL)
import iconPaw from "../assets/about_us/icons/paw-search.svg";
import iconChat from "../assets/about_us/icons/chat-people.svg";
import iconShield from "../assets/about_us/icons/shield-paw.svg";
import iconStar from "../assets/about_us/icons/star-paw.svg";
import iconHeadset from "../assets/about_us/icons/headset.svg";

// Team images (WebP as URL)
import aminUrl from "../assets/about_us/teamMember/amin.webp";
import mohammadUrl from "../assets/about_us/teamMember/mohammad.webp";
import sadraUrl from "../assets/about_us/teamMember/sadra.webp";
import baharUrl from "../assets/about_us/teamMember/bahar.webp";
import fatemehUrl from "../assets/about_us/teamMember/fatemeh.webp";
import mobinaUrl from "../assets/about_us/teamMember/mobina.webp";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Feature, TeamMember } from "@/types/aboutUs";
import { FeatureItem } from "@/components/AboutUs/FeatureItemComponent";

const features: Feature[] = [
  {
    icon: iconPaw,
    title: "جست‌وجو و انتخاب هوشمند",
    text: "میان ده‌ها نفر حرفه‌ای و مورد اعتماد جست‌وجو کنید و بر اساس منطقه، نوع خدمت، قیمت و زمان، بهترین گزینه را بیابید.",
  },
  {
    icon: iconChat,
    title: "گفت‌وگو و تعیین شرایط",
    text: "پیش از رزرو نهایی با مراقب گفت‌وگو کنید، شرایط را مشخص نمایید و با اطمینان تصمیم بگیرید.",
  },
  {
    icon: iconShield,
    title: "پرداخت امن",
    text: "از طریق پرداخت امن مطمئن باشید هزینه تنها پس از انجام کامل خدمت منتقل می‌شود.",
  },
  {
    icon: iconStar,
    title: "امتیازدهی و بازخورد",
    text: "تجربه‌ی خود را ثبت کنید تا به رشد و بهبود جامعه‌ی پت‌یار کمک نمایید.",
  },
  {
    icon: iconHeadset,
    title: "پشتیبانی همیشه همراه",
    text: "در صورت بروز هرگونه مشکل یا ابهام، روی پشتیبانی ما حساب کنید.",
  },
];

const team: TeamMember[] = [
  { name: "بهار", img: baharUrl },
  { name: "فاطمه", img: fatemehUrl },
  { name: "مبینا", img: mobinaUrl },
  { name: "محمد", img: mohammadUrl },
  { name: "امین", img: aminUrl },
  { name: "صدرا", img: sadraUrl },
];

export default function AboutUs() {
  return (
    <main dir="rtl" className="min-h-screen bg-second-background">
      {/* Hero */}
      <section className="min-h-screen flex items-center">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <p className="text-hero text-center mb-6 md:mb-8">درباره ما</p>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16">
            {/* متن (راست) */}
            <div className="space-y-4 md:space-y-5 max-w-[640px]">
              <p role="heading" className="text-title">
                سلام دوست پت دوست! خوش اومدی به پت‌یار
              </p>
              <p className="text-normal text-muted-foreground text-justify">
                جایی صمیمی و امن برای عاشقان پت‌ها — شاید برات جالب باشه بدونی
                پت‌یار از کجا شروع شد…
              </p>
              <p className="text-normal text-muted-foreground text-justify">
                ما هم مثل خیلی از صاحبان پت، دنبال مراقب مطمئن بودیم. تماس
                گرفتیم، جست‌وجو کردیم، اما هیچ گزینه‌ای که هم امن باشد و هم قابل
                اعتماد پیدا نکردیم.
              </p>
              <p className="text-normal text-muted-foreground text-justify">
                همان‌جا بود که ایدهٔ پت‌یار شکل گرفت؛ یک پلتفرم با شفافیت، سادگی
                و اطمینان؛ صاحبان پت و مراقبان دلسوز را کنار هم قرار می‌دهد.
              </p>
            </div>

            {/* تصویر (چپ در دسکتاپ) */}
            <div className="order-[-1] md:order-none">
              <img
                src={heroUrl}
                alt="صاحب پت و سگ"
                className="w-full max-w-[560px] max-h-[70vh] mx-auto rounded-2xl object-contain"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features (Moved Up) */}
      <section className="container max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10 mt-2 md:mt-4">
        <p role="heading" className="text-title text-right mb-6 md:mb-8">
          در این پلتفرم می‌توانید:
        </p>
        <ul className="divide-y divide-zinc-200">
          {features.map((f) => (
            <FeatureItem key={f.title} item={f} />
          ))}
        </ul>
      </section>

      {/* Team (Moved Down) */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-14 md:py-20">
        <div className="text-center space-y-3">
          <p role="heading" className="text-title">
            تیم پت‌یار کنار توست
          </p>
          <p className="text-normal text-muted-foreground max-w-3xl mx-auto">
            ما یک تیم کوچک ولی عاشق حیواناتیم؛ از طراحی و پشتیبانی گرفته تا
            توسعه و ارتباط با کاربران — همه با یک هدف: ساختن دنیایی مهربان‌تر
            برای پت‌ها.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-10 md:mt-12 place-items-center">
          {team.map((m) => (
            <div key={m.name} className="text-center space-y-2 md:space-y-3">
              <Avatar className="w-24 h-24 md:w-36 md:h-36">
                <AvatarImage
                  className="object-cover"
                  src={m.img}
                  loading="lazy"
                  decoding="async"
                />
                <AvatarFallback>{m.name}</AvatarFallback>
              </Avatar>
              {m.img && (
                <div className="font-medium text-small md:text-normal">
                  {m.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
