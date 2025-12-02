export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

  if (diff < 60) return "چند لحظه پیش";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} دقیقه پیش`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ساعت پیش`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} روز پیش`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} هفته پیش`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ماه پیش`;

  const years = Math.floor(days / 365);
  return `${years} سال پیش`;
}
