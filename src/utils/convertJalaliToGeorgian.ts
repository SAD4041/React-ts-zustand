import jalaali, { type JalaaliDateObject } from "jalaali-js";
export function convertJalaliToGregorianDate({
	jy,
	jm,
	jd,
}: JalaaliDateObject) {
	const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
	return new Date(gy, gm - 1, gd);
}
export function convertGregorianToJalaliDate(date: Date) {
	const { jy, jm, jd } = jalaali.toJalaali(
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate(),
	);
	return { jy, jm, jd };
}
