import axios from "axios";

export function translateAxiosError(error: unknown): string {
	if (!axios.isAxiosError(error)) {
		return "خطای غیر منتظره";
	}

	if (error.code === "ECONNABORTED") {
		return "درخواست بیش از حد طول کشید.";
	}

	if (!error.response) {
		return "اتصال به سرور برقرار نشد. لطفا اینترنت خود را بررسی کنید.";
	}

	const status = error.response.status;

	switch (status) {
		case 400:
			return "درخواست نامعتبر است.";
		case 401:
			return "شما احراز هویت نشدهاید.";
		case 403:
			return "دسترسی به این بخش برای شما مجاز نیست.";
		case 404:
			return "مورد موردنظر پیدا نشد.";
		case 408:
			return "مهلت درخواست به پایان رسید.";
		case 429:
			return "درخواستهای بیش از حد. لطفا کمی صبر کنید.";
		case 500:
			return "خطای داخلی سرور.";
		case 502:
			return "پاسخ نامعتبر از سرور دریافت شد.";
		case 503:
			return "سرور در حال حاضر در دسترس نیست.";
		case 504:
			return "زمان پاسخ سرور به پایان رسید.";
		default:
			return (
				error.response.data?.message || `خطایی با کد ${status} رخ داده است.`
			);
	}
}
