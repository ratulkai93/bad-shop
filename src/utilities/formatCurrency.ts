const CURRENCY_formatter= new Intl.NumberFormat(undefined, {
    currency:"CAD", style:"currency"})

export function FormatCurrency(number: number){
    return CURRENCY_formatter.format(number)
}