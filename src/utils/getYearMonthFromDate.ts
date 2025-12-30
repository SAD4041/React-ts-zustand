export function ageYearsMonths(isoBirthDate: string | null): string | null {
  if (!isoBirthDate) return null;

  const birth = new Date(isoBirthDate);
  const now = new Date();

  if (Number.isNaN(birth.getTime())) return "تاریخ نامعتبر";
  if (birth > now) return "0 سال و 0 ماه و 0 روز";

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;

    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years === 0 && months === 0 && days === 0) {
    return "سن و وضعیت بلوغ وارد نشده";
  }

  let result = "";

  if (years > 0) result += `${years} سال `;
  if (months > 0) result += `${months} ماه `;
  if (days > 0) result += `${days} روز`;

  return result.trim();
}
