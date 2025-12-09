import { toPersianDigits } from "./PersianDigits";

export const formatPrice = (num: number): string => {
    return toPersianDigits(num.toLocaleString("en-US"));
};
