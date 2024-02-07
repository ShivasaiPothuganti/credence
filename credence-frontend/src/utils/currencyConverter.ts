
const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
});

export function convertCurrencyToInr(amount:number):string{
    return currencyFormatter.format(amount);
}