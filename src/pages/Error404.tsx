import { Button } from "@/components/Custom/Button/Button";

export default function Error404() {
	return (
		<main
			dir="rtl"
			className="min-h-screen bg-second-background flex items-center justify-center px-4"
		>
			<div className="text-center max-w-xl">
				<p className="text-hero">۴۰۴</p>
				<h1 className="text-title mt-2">صفحه پیدا نشد</h1>
				<p className="text-normal text-muted-foreground mt-3">
					صفحه‌ای که دنبال آن هستید وجود ندارد یا منتقل شده است.
				</p>
				<div className="mt-8 flex items-center justify-center">
					<Button
						onClick={() => {
							window.location.href = "/";
						}}
					>
						بازگشت به خانه
					</Button>
				</div>
			</div>
		</main>
	);
}
