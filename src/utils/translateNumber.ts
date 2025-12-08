export function translateNumber(number: number | string): string {
	// Persian digits mapping from 0 to 9
	const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

	// Convert the input number to a string
	const numberStr = number?.toString();

	// Replace each digit with its Persian equivalent
	return numberStr
		?.split("") // Split the number into individual characters
		?.map((digit) => {
			const num = parseInt(digit, 10);
			return isNaN(num) ? digit : persianDigits[num];
		})
		?.join(""); // Join the array of Persian characters back into a string
}


export function persianToEnglishNumbers(value: string): string {
	const persianDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];

	let result = value;

	persianDigits.forEach((d, i) => {
		result = result.replace(new RegExp(d, 'g'), i.toString());
	});

	return result;
}