function FormattedCurrency(angka: number): string {
  const reverse: string = angka.toString().split('').reverse().join('');
  const ribuan: RegExpMatchArray | null = reverse.match(/\d{1,3}/g);
  const formatted: string = ribuan ? ribuan.join('.').split('').reverse().join('') : '';
  return `Rp ${formatted}`;
}
export default FormattedCurrency;
