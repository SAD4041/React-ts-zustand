import { Button } from "@/components/Custom/Button/Button";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { FaTelegram, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function FooterDesktop() {
	return (
		<footer className="w-full bottom-0 ">
			<div className="bg-teal-900 text-white py-8 rtl">
				<div className="flex justify-center">
					<div className="justify-center w-full flex items-start h-60">
						<div className="flex flex-col justify-center w-fit">
							<p className="text-lg font-bold px-4">پتیار</p>
							<ul className="space-y-1 mt-5">
								<li>
									<Button className="text-white" variant="link" shadow={false}>
										<Link to="/AboutUs">درباره ما</Link>
									</Button>
								</li>
								<li>
									<Button className="text-white" variant="link" shadow={false}>
										سوالات متداول
									</Button>
								</li>
								<li>
									<Button className="text-white" variant="link" shadow={false}>
										قوانین و مقررات
									</Button>
								</li>
							</ul>
						</div>
					</div>

					<div className="w-full flex justify-center items-start">
						<div className="flex flex-col justify-center w-fit">
							<p className="text-lg font-bold px-4 whitespace-nowrap">
								راههای ارتباطی
							</p>
							<ul className="space-y-1 mt-5">
								<li>
									<Button className="text-white" variant="link" shadow={false}>
										ایمیل
									</Button>
								</li>
								<li>
									<Button className="text-white" variant="link" shadow={false}>
										تلفن
									</Button>
								</li>
							</ul>
						</div>
					</div>

					<div className="w-full flex justify-center items-start">
						<div className="flex flex-col justify-center w-fit">
							<p className="text-lg whitespace-nowrap font-bold">
								شبکههای اجتماعی
							</p>
							<div className="mt-3 flex items-center gap-4">
								<a
									href="https://t.me/yourchannel"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="تلگرام"
									title="تلگرام"
									className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:text-sky-400 transition-colors duration-300"
								>
									<FaTelegram size={22} />
								</a>
								<a
									href="https://www.instagram.com/yourpage"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="اینستاگرام"
									title="اینستاگرام"
									className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:text-pink-400 transition-colors duration-300"
								>
									<FaInstagram size={22} />
								</a>
								<a
									href="https://linkedin.com/in/yourprofile"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="لینکدین"
									title="لینکدین"
									className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:text-blue-400 transition-colors duration-300"
								>
									<FaLinkedin size={22} />
								</a>
							</div>
							{/*
								<>
									<p className="text-lg mt-20 font-bold">نماد اعتماد</p>
									<img
										src="/src/assets/footer/Screenshot 2025-10-12 181542 1.png"
										alt="نماد اعتماد"
										className="mt-3"
										width={100}
									/>
								</>
							*/}
						</div>
					</div>
				</div>

				<div className="mt-20 mx-auto w-[90%]">
					<div className="border-b-2 border-white"></div>
					<p className="text-sm py-4 text-center md:text-right">
						کلیه حقوق مادی و معنوی این سایت متعلق به پتیار است.
					</p>
				</div>
			</div>
		</footer>
	);
}

function FooterMobile() {
	return (
		<footer className="w-full bottom-0 ">
			<div className="bg-teal-900 text-white py-8 rtl">
				<div className="grid grid-cols-2 gap-y-10 gap-x-4 justify-items-center">
					<div className="flex flex-col items-start">
						<p className="text-lg font-bold px-4">پتیار</p>
						<ul className="space-y-1 mt-3 text-start">
							<li>
								<Button className="text-white" variant="link" shadow={false}>
									درباره ما
								</Button>
							</li>
							<li>
								<Button className="text-white" variant="link" shadow={false}>
									سوالات متداول
								</Button>
							</li>
							<li>
								<Button className="text-white" variant="link" shadow={false}>
									قوانین و مقررات
								</Button>
							</li>
						</ul>
					</div>

					<div className="flex flex-col items-start">
						<p className="text-lg font-bold px-4 whitespace-nowrap">
							راههای ارتباطی
						</p>
						<ul className="space-y-1 mt-3 text-start">
							<li>
								<Button className="text-white" variant="link" shadow={false}>
									ایمیل
								</Button>
							</li>
							<li>
								<Button className="text-white" variant="link" shadow={false}>
									تلفن
								</Button>
							</li>
						</ul>
					</div>

					<div className="flex flex-col items-start">
						<p className="text-lg font-bold whitespace-nowrap">
							شبکههای اجتماعی
						</p>
						<div className="mt-3 flex items-center gap-4">
							<a
								href="https://t.me/yourchannel"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="تلگرام"
								title="تلگرام"
								className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:text-sky-400 transition-colors duration-300"
							>
								<FaTelegram size={22} />
							</a>
							<a
								href="https://www.instagram.com/yourpage"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="اینستاگرام"
								title="اینستاگرام"
								className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:text-pink-400 transition-colors duration-300"
							>
								<FaInstagram size={22} />
							</a>
							<a
								href="https://linkedin.com/in/yourprofile"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="لینکدین"
								title="لینکدین"
								className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:text-blue-400 transition-colors duration-300"
							>
								<FaLinkedin size={22} />
							</a>
						</div>
					</div>

					<div className="flex flex-col items-start">
						<p className="text-lg font-bold">نماد اعتماد</p>
						<img
							src="/src/assets/footer/Screenshot 2025-10-12 181542 1.png"
							alt="نماد اعتماد"
							className="mt-3"
							width={90}
						/>
					</div>
				</div>

				<div className="mt-20 w-4/5 mx-auto">
					<div className="border-b-2 border-white"></div>
					<p className="text-right py-4 text-sm">
						کلیه حقوق مادی و معنوی این سایت متعلق به پتیار است.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default function Footer() {
	const isMobile = useMobile();
	return isMobile ? <FooterMobile /> : <FooterDesktop />;
}
