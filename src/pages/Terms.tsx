// src/pages/Terms.tsx
// import React from "react";

const SUPPORT_EMAIL = "support@petyar.ir";
const SUPPORT_PHONE = "0XX-XXXXXXX-21";

export default function Terms() {
  return (
    <main dir="rtl" className="min-h-screen bg-second-background">
      <section className="container mx-auto max-w-4xl px-4 md:px-8 py-10 md:py-14">
     
        <p className="text-hero text-center mb-8 md:mb-10">
          قوانین و مقررات سامانه پت‌یار
        </p>

        {/* مقدمه */}
        <p className="text-normal text-muted-foreground text-justify leading-8 mb-10">
          به سامانهٔ پت‌یار خوش آمدید. استفاده از این وب‌سایت، به معنای مطالعه، درک و پذیرش کامل
          قوانین و شرایط زیر است. این قوانین ممکن است در آینده به‌روزرسانی شوند؛ لطفاً پیش از استفاده مطالعه کنید.
        </p>

        <div className="space-y-10 leading-8">
          <section>
            <p className="text-section mb-3">۱. تعاریف</p>
            <p className="text-normal text-justify">برای درک بهتر مفاد این قرارداد، اصطلاحات زیر به کار رفته‌اند:</p>
            <ul className="list-disc pr-6 mt-3 space-y-2">
              <li className="text-small"><span className="font-medium">سامانهٔ پت‌یار:</span> بستر ارتباطی بین صاحبان پت و پت‌یاران.</li>
              <li className="text-small"><span className="font-medium">صاحب پت:</span> کاربری که درخواست خدمات ثبت می‌کند.</li>
              <li className="text-small"><span className="font-medium">پت‌یار:</span> ارائه‌دهندهٔ خدمات مراقبت از حیوانات.</li>
              <li className="text-small"><span className="font-medium">پشتیبانی سامانه:</span> تیم رسمی رسیدگی و نظارت.</li>
            </ul>
          </section>

          <section>
            <p className="text-section mb-3">۲. شرایط عضویت و استفاده</p>
            <ul className="list-disc pr-6 space-y-2">
              <li className="text-small">عضویت برای افراد بالای ۱۸ سال مجاز است.</li>
              <li className="text-small">ثبت اطلاعات صحیح، کامل و به‌روز الزامی است.</li>
              <li className="text-small">مسئولیت حفاظت از اطلاعات ورود بر عهدهٔ کاربر است.</li>
              <li className="text-small">در صورت تخلف، سامانه می‌تواند حساب را تعلیق یا حذف کند.</li>
            </ul>
          </section>

          <section>
            <p className="text-section mb-3">۳. ثبت و لغو خدمات</p>
            <ul className="list-disc pr-6 space-y-2">
              <li className="text-small">ثبت نوع خدمت، زمان و محل از طریق سامانه انجام می‌شود.</li>
              <li className="text-small">پت‌یار موظف به اجرای توافق ثبت‌شده است.</li>
              <li className="text-small">لغو/تغییر باید در سامانه و طبق شرایط انجام شود.</li>
              <li className="text-small">اختلاف‌ها از طریق پشتیبانی پیگیری می‌شود.</li>
            </ul>
          </section>

          <section>
            <p className="text-section mb-3">۴. پرداخت، لغو و بازگشت وجه</p>
            <ul className="list-disc pr-6 space-y-2">
              <li className="text-small">پرداخت‌ها از درگاه امن انجام و تا پایان خدمت نزد سامانه می‌ماند.</li>
              <li className="text-small">پس از تأیید صاحب پت، مبلغ به پت‌یار واریز می‌شود.</li>
              <li className="text-small">بازگشت وجه طبق سیاست‌های کنسلی بررسی می‌شود.</li>
            </ul>
          </section>

          <section>
            <p className="text-section mb-3">۵. مسئولیت‌ها و محدودیت‌ها</p>
            <ul className="list-disc pr-6 space-y-2">
              <li className="text-small">پت‌یار مسئول نگهداری ایمن حیوان در طول خدمت است.</li>
              <li className="text-small">سامانه مسئول توافقات خارج از پلتفرم نیست.</li>
              <li className="text-small">خسارات احتمالی بر اساس مستندات بررسی می‌شود.</li>
            </ul>
          </section>

          <section>
            <p className="text-section mb-3">۶. قوانین اخلاقی و انضباطی</p>
            <ul className="list-disc pr-6 space-y-2">
              <li className="text-small">رعایت احترام متقابل الزامی است.</li>
              <li className="text-small">ارسال محتوای توهین‌آمیز یا آزار حیوانات ممنوع است.</li>
              <li className="text-small">در صورت تخلف، حساب می‌تواند مسدود شود.</li>
            </ul>
          </section>

          <section>
            <p className="text-section mb-3">۷. امتیازدهی و نظارت کیفی</p>
            <ul className="list-disc pr-6 space-y-2">
              <li className="text-small">پس از هر خدمت امکان ثبت امتیاز و نظر وجود دارد.</li>
              <li className="text-small">نظرات مغایر قوانین می‌تواند حذف/ویرایش شود.</li>
            </ul>
          </section>

          <section>
            <p className="text-section mb-3">۸. حریم خصوصی و اطلاعات کاربران</p>
            <ul className="list-disc pr-6 space-y-2">
              <li className="text-small">اطلاعات کاربران محرمانه نگهداری می‌شود.</li>
              <li className="text-small">استفاده از داده‌ها فقط برای ارائهٔ خدمات و مطابق قانون است.</li>
            </ul>
          </section>

          <section>
            <p className="text-section mb-3">۹. محدودیت‌های استفاده از سایت</p>
            <ul className="list-disc pr-6 space-y-2">
              <li className="text-small">استفاده از برند/کدها بدون مجوز کتبی ممنوع است.</li>
              <li className="text-small">هرگونه دسترسی غیرمجاز یا اختلال پیگرد قانونی دارد.</li>
            </ul>
          </section>

          <section>
            <p className="text-section mb-3">۱۰. مالکیت معنوی</p>
            <ul className="list-disc pr-6 space-y-2">
              <li className="text-small">تمام حقوق محتوا و کد متعلق به سامانه پت‌یار است.</li>
              <li className="text-small">بهره‌برداری تجاری بدون مجوز ممنوع است.</li>
            </ul>
          </section>

          <section>
            <p className="text-section mb-3">۱۱. تغییر در قوانین</p>
            <ul className="list-disc pr-6 space-y-2">
              <li className="text-small">قوانین ممکن است به‌روزرسانی شوند و از زمان انتشار لازم‌الاجرا هستند.</li>
              <li className="text-small">ادامهٔ استفاده، به‌منزلهٔ پذیرش نسخهٔ جدید است.</li>
            </ul>
          </section>

          <section>
            <p className="text-section mb-3">۱۲. پشتیبانی و ارتباط با ما</p>
            <ul className="list-disc pr-6 space-y-2">
              <li className="text-small">
                برای پرسش‌ها و گزارش‌ها از پشتیبانی سایت یا ایمیل رسمی استفاده کنید.
              </li>
              <li className="text-small">
                ایمیل:{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary underline">
                  {SUPPORT_EMAIL}
                </a>{" "}
                | تلفن:{" "}
                <a href={`tel:${SUPPORT_PHONE}`} className="text-primary underline">
                  {SUPPORT_PHONE}
                </a>{" "}
                — ساعات پاسخ‌گویی: هر روز ۹ تا ۱۸
              </li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
