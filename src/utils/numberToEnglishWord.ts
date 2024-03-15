export class NumberToWordsConverter {
  private static underTwenty: string[] = [
    'One', 'Two', 'Three', 'Four', 'Five',
    'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
    'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  private static tens: string[] = [
    '', '', 'Twenty', 'Thirty', 'Forty',
    'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];
  private static thousands: string[] = [
    '', 'Thousand', 'Million', 'Billion'
  ];

  public static convert(num: number): string {
    if (num === 0) return 'Zero';
    if (num < 20) return this.underTwenty[num - 1];
    if (num < 100) return `${this.tens[Math.floor(num / 10)]} ${num % 10 > 0 ? this.underTwenty[num % 10 - 1] : ''}`.trim();
    if (num < 1000) return `${this.underTwenty[Math.floor(num / 100) - 1]} Hundred ${this.convert(num % 100)}`.trim();
    
    for (let i = 0; i < this.thousands.length; i++) {
      const divisor = Math.pow(1000, i + 1);
      if (num < divisor) {
        const prefix = this.convert(Math.floor(num / Math.pow(1000, i)));
        const suffix = num % Math.pow(1000, i) === 0 ? '' : this.convert(num % Math.pow(1000, i));
        const space = suffix ? ' ' : '';
        return `${prefix} ${this.thousands[i]}${space}${suffix}`.trim();
      }
    }

    return 'Number is too large or not handled';
  }
}
