function formatFollowBarNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\,0$/, "") + "M";
  } else if (num >= 10_000) {
    return (num / 1_000).toFixed(1).replace(/\,0$/, "") + "K";
  } else {
    const number = String(num);
    return (
      number.substring(0, number.length - 3) +
      // "," +
      number.substring(number.length - 3, number.length)
    );
  }
}
export default formatFollowBarNumber;