/**
 * Money is encapsulated in this class.
 */
export default class Money {
  /**
  * The constructor fetches the currency string from the config
  * and sets the amount of money to zero.
  */
  constructor ({currency}) {
    this.currency = currency
    this.amount = 0
  }

  /**
   * Returns the amount + the currency.
   */
  toString () {
    return shownAmountConverter(this.amount) + ' ' + this.currency
  }
}

/**
 * SI prefixes. Note that the rounding to one decimal has been taken into
 * account.
 */
const magnitude = {
  k: 1000,
  M: 999950,
  G: 999950000,
  T: 1000000000000
}

/**
 * This function converts the amount of money shown in the top bar into SI
 * prefixes if the value is more than one thousand.
 */
const shownAmountConverter = (amount) => {
  if (amount < magnitude.k) return amount.toString()
  if (amount >= magnitude.T) return '1+T'

  return amount >= magnitude.G
    ? moveDecimal(amount, 9).toString() + 'G'
    : amount >= magnitude.M
      ? moveDecimal(amount, 6).toString() + 'M'
      : moveDecimal(amount, 3).toString() + 'k'
}

/**
 * This function moves the decimal point in a number n by 'exponent' places
 * to the left. The return value is rounded to one decimal.
 */
function moveDecimal (n, exponent) {
  var v = n / Math.pow(10, exponent)
  return v.toFixed(1)
}
