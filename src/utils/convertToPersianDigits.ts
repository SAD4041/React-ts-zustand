function convertToPersianDigits(input: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  let output = "";
  
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (/\d/.test(ch)) {
      output += persianDigits[parseInt(ch, 10)];
    } else {
      output += ch; 
    }
  }

  return output;
}

export default convertToPersianDigits;
