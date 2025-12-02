import moment from "moment-jalaali";


export const convertToJalali = (isoDate: string): string => {
  try {
    // parse تاریخ ISO و تبدیل به شمسی
    return moment(isoDate).format("jYYYY/jMM/jDD");
  } catch {
    return "1402/01/01";
  }
};
