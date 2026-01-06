import pet from "@/assets/images/pet.png";
import Image4 from "@/assets/landing/Image4.png";

import StepCard from "@/components/Landing/StepCard";
import Step1Icon from "@/assets/steps/step1.png";
import Step2Icon from "@/assets/steps/step2.png";
import Step3Icon from "@/assets/steps/step3.png";


import {
    Home,
    UsersRound,
    ShieldCheck,
    MessageSquareText,
    Clock,
    Wallet,
} from "lucide-react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/Custom/Button/Button";
import FeatureCard from "@/components/Landing/FeatureCard";
import FaqItem from "@/components/Landing/FaqItem";
import { useState } from "react";

function PetSitterLanding() {

	const [faq1Open, setFaq1Open] = useState(true);
	const [faq2Open, setFaq2Open] = useState(false);
	const [faq3Open, setFaq3Open] = useState(false);
    const [faq4Open, setFaq4Open] = useState(false);

	const otherSetStates = [setFaq1Open, setFaq2Open, setFaq3Open];
	return (
		<div
			className="w-full flex flex-col items-center justify-center mt-20 bg-primary-50"
			dir="rtl"
		>
			<div className="flex flex-col items-center lg:items-stretch lg:flex-row w-full h-auto lg:h-180 px-7 gap-12 lg:gap-20 pt-12 sm:pt-16">
				<div className="lg:w-1/2 flex items-center justify-center justify-end lg:justify-end">
					<div className="lg:w-150 flex flex-col items-center gap-1">
						<div className="text-xl sm:text-3xl font-bold text-center">
                            با عشق به حیوانات درآمد بساز    
						</div>
						<div className="flex flex-col items-center text-center text-xl sm:text-3xl ">
							<p className="leading-snug sm:leading-snug lg:leading-normal">
								با زمان‌های آزادی که داری رو به مراقبت از پت‌ها تبدیل کن. انعطاف کامل در ساعت کاری و درآمد شفاف و پشتیبانی مستمر.
							</p>

							<Button
								type="submit"
								size={"giant"}
								bold={true}
								className="font-[Alibaba] font-bold mt-10 text-lg lg:text-2xl px-10 py-3 sm:px-20 sm:py-4 lg:px-34 lg:py-6"
							>
								همین حالا ثبت‌نام کن
							</Button>
						</div>

						
					</div>
				</div>
				<div className="lg:w-1/2 flex">
					<div className="lg:w-160 flex items-center justify-center mt-10 ">
						<img src={pet} alt="Landing" className="w-auto h-auto" />
					</div>
				</div>
			</div>
			

			
			<div className="w-full h-auto flex flex-col items-center px-7 mt-10 ">
				<p className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mt-35">
					چرا به ما بپیوندی؟
				</p>
				<p className="text-xl mt-5 text-center">
					مزایای منحصر به فردی که تجربه کار با ما رو متفاوت میکنه
				</p>

				<div className="flex flex-col sm:flex-row lg:flex-col gap-5 lg:gap-0 mt-20 sm:mt-0">
					<div className="flex flex-col lg:flex-row gap-5 xl:gap-15 sm:mt-20">
						<FeatureCard
							Icon={Clock}
							text="هر زمان که آزاد هستی کار کن.
کنترل کامل برنامه های کاری خودت رو داشته باش."
							title="انعطاف در ساعت کاری"
						/>
						<FeatureCard
							Icon={Wallet}
							text="پرداخت  درآمد مشخص و شفاف . همیشه میدونی چقدر درآمد داری."
							title="درآمد شفاف"
						/>
						<FeatureCard
							Icon={UsersRound}
							text="با امتیاز بالا سفارش های تکراری و مشتری های وفادار پیدا کن."
							title="مشتری های ثابت"
						/>
					</div>
					<div className="flex flex-col lg:flex-row gap-5 xl:gap-15 sm:mt-20">
						<FeatureCard
							Icon={ShieldCheck}
							text="احراز هویت کامل و قرارداد معتبر و پشتیبانی ۷/۲۴ همیشه کنارت هستند."
							title=" امنیت و پشتیبانی"
						/>
						<FeatureCard
							Icon={MessageSquareText}
							text="ارتباط مستقیم با صاحبان پت برای هماهنگی جزییات دقیق خدمت."
							title="چت مستقیم"
						/>
						<FeatureCard
							Icon={Home}
							text="نزدیک‌ترین درخواست‌ها را قبول کن و زمان و هزینه رفت‌وآمدت را کاهش بده."
							title="کار در نزدیکی محل زندگی"
						/>
					</div>
				</div>
			</div>

            <div className="bg-secondary-200 w-full flex flex-col items-center gap-6 py-10 mt-70 mb-16">
				<div className="flex w-9/10 lg:w-8/10 justify-between items-center">
					<p className="text-2xl font-bold">تجربه پت‌یار ها</p>
					
				</div>
				<Carousel
					  opts={{ loop: true, direction: "rtl" }}
					  className="w-full flex justify-center"
					>
					  <div className="w-1/10 hidden lg:flex items-center justify-center">
					    <CarouselNext className="relative top-0 right-0 left-0 bottom-0 translate-y-0 size-15 cursor-pointer" />
					  </div>
						
					  <div className="w-9/10 lg:w-8/10">
					    <CarouselContent>
					      {Array.from({ length: 10 }).map((_, index) => (
					        <CarouselItem className="basis-55 w-full" key={index}>
					          <div className="w-full h-auto max-w-50 min-w-50 bg-card shadow-sm rounded-2xl px-3 pt-3 pb-2 flex flex-col">
					            <div className="w-full h-36 bg-secondary-700 rounded-t-2xl"></div>
					            <p className="font-bold mt-3">سارا احمدی</p>
					            <p className="text-sm">
					              با سلام و عرض ادب سایت شما بستر مناسبی بود برای پیدا کردن حیوانات زیبا و دوست داشتنی. 
					              من از شما بسیار ممنونم.
					            </p>
					          </div>
					        </CarouselItem>
					      ))}
					    </CarouselContent>
					  </div>
					  
					  <div className="w-1/10 hidden lg:flex items-center justify-center">
					    <CarouselPrevious className="relative top-0 right-0 left-0 bottom-0 translate-y-0 size-15 cursor-pointer" />
					  </div>
					</Carousel>
					  
			</div>

            <div className="w-full flex flex-col items-center mt-50 px-7">
            	<p className="text-2xl sm:text-3xl font-bold mb-10">
            		در سه گام پتیار شو
            	</p>

            	<div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-center items-stretch w-full max-w-5xl">
            		<StepCard
            			step={1}
            			icon={Step1Icon}
            			iconAlt="ثبت نام"
            			label="SIGN UP & VERIFICATION"
            			title="ثبت نام و احراز هویت"
            			description="مدارک خود را بارگذاری کن و بعد از یک بررسی کوتاه، حساب حرفه‌ای‌ات فعال می‌شود."
            		/>
            		<StepCard
            			step={2}
            			icon={Step2Icon}
            			iconAlt="نرخ و تقویم"
            			label="PRICE & CALENDAR"
            			title="تعریف نرخ و تقویم"
            			description="نرخ‌ها، سرویس‌ها و زمان‌های آزاد خودت را در تقویم به‌روزرسانی کن."
            		/>
            		<StepCard
            			step={3}
            			icon={Step3Icon}
            			iconAlt="دریافت رزرو"
            			label="PRICE & CALENDAR"
            			title="دریافت و قبول رزرو"
            			description="درخواست‌ها را دریافت کن، با صاحب حیوان گفتگو کن و رزرو را تایید کن."
            		/>
            	</div>
            </div>


			
			
			<div className="flex flex-col w-5/6 sm:w-3/4 lg:w-full h-auto sm:px-7 mt-50 max-w-250 mb-30">
				<p className="text-xl font-bold">سوالات متداول</p>
				<div className="w-full rounded-3xl h-auto mt-3 px-7 pt-7 bg-primary-300 grid grid-cols-1 grid-rows-1 lg:flex justify-between">
					<div className="flex flex-col h-auto min-h-100 gap-3 items-center lg:items-start row-start-1 col-start-1 z-10">
						<FaqItem
							index={0}
							open={faq1Open}
							setOpen={setFaq1Open}
							otherSetStates={otherSetStates}
							text="چطور می‌تونم پت‌یار بشم؟"
							answer="برای شروع فقط کافیه تو پلتفرم ثبت‌نام کنی، اطلاعات شخصی‌ات (نام، سن، شهر، شماره تماس و…) رو وارد کنی و پروفایل حرفه‌ای‌ات رو کامل کنی. بعد از بارگذاری مدارک هویتی و یک بررسی کوتاه، حساب پت‌یاریت فعال می‌شه و می‌تونی خدماتت رو تعریف کنی و درخواست بگیری."
						/>
						<FaqItem
							index={1}
							open={faq2Open}
							setOpen={setFaq2Open}
							otherSetStates={otherSetStates}
							text="پت‌یار چه خدماتی می‌تونه ارائه بده؟"
							answer="به‌عنوان پت‌یار می‌تونی بسته به تجربه‌ات خدمات مختلفی مثل نگهداری از پت، پیاده‌روی، بازی و اجتماعی‌سازی، آرایش و گرومینگ، آموزش، و مراقبت‌های ساده‌ی پزشکی یا پیگیری وضعیت سلامت رو ارائه بدی. نوع خدمات و نرخ هر کدوم رو خودت در پروفایلت مشخص می‌کنی تا صاحبان پت بتونن راحت‌تر انتخاب کنن."
						/>
						<FaqItem
							index={2}
							open={faq3Open}
							setOpen={setFaq3Open}
							otherSetStates={otherSetStates}
							text="پرداخت‌ها چطور انجام می‌شه و پول رو کی دریافت می‌کنم؟"
							answer="پرداخت به‌صورت امن و درون پلتفرم انجام می‌شه. صاحب پت مبلغ سرویس رو قبل از شروع کار پرداخت می‌کنه، اما پول تا پایان موفقِ سرویس در سیستم به‌صورت مشروط نگه داشته می‌شه. بعد از ثبت پایان خدمت، مبلغ از کیف پول صاحب پت به کیف پول تو منتقل می‌شه و هر زمان خواستی می‌تونی اون رو برداشت کنی."
						/>
                        <FaqItem
							index={3}
							open={faq4Open}
							setOpen={setFaq4Open}
							otherSetStates={otherSetStates}
							text="اگر با صاحب پت به مشکل بخورم یا پت دچار مشکل بشه چی می‌شه؟"
							answer="در طول فرایند، چت امن درون برنامه‌ای و امکان ریپورت و ثبت شکایت وجود داره. تیم پشتیبانی با بررسی گزارش‌ها و نظرات، سعی می‌کنه اختلاف‌ها رو مدیریت کنه. همچنین سیستم امتیازدهی باعث می‌شه پت‌یارها و صاحبان پت خوش‌حساب و مسئولیت‌پذیر بیشتر دیده بشن و همکاری‌های بعدی با خیال راحت‌تری انجام بشه."
						/>
					</div>
					<div className="row-start-1 col-start-1 w-full lg:w-auto flex items-end justify-center">
						<img src={Image4} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default PetSitterLanding;
