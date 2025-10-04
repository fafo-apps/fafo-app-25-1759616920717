export function formatCents(cents: number, currency: string = "USD", locale: string = "en-US") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(cents / 100);
}
