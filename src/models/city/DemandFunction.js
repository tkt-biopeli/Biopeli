export default class DemandFunction {
  constructor ({ city, popularityPct, slope }) {
    this.city = city
    this.popularityPct = popularityPct
    this.slope = slope
  }

  calculate (supply) {
    let ratio = supply / (this.customers() / 2)
    let fulfilledPct = ratio < 1 ? ratio * 100 : 100

    return {
      percentage: fulfilledPct,
      earnings: supply * this.price(supply)
    }
  }

  price (supply) {
    let price = (this.customers() - supply) / this.slope
    return price > 0 ? price : 0
  }

  customers () {
    return this.city.population * this.popularityPct / 100
  }
}
