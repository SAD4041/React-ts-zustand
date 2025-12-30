export function toTehranISOString(date: Date) {
	const offsetMinutes = 3 * 60 + 30;

	const tehranDate = new Date(date.getTime() + offsetMinutes * 60 * 1000);

	const pad = (n: number) => n.toString().padStart(2, "0");

	const year = tehranDate.getUTCFullYear();
	const month = pad(tehranDate.getUTCMonth() + 1);
	const day = pad(tehranDate.getUTCDate());
	const hours = pad(tehranDate.getUTCHours());
	const minutes = pad(tehranDate.getUTCMinutes());
	const seconds = pad(tehranDate.getUTCSeconds());

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+03:30`;
}
