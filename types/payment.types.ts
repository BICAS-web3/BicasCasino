export interface InvoicePriceRoot {
  status: string
  body: InvoicePrices
}

export interface InvoicePrices {
  type: string
  prices: InvoicePriceItem[]
}

export interface InvoicePriceItem {
  monetary: string
  rates: Rate[]
}

export interface Rate {
  fiatCurrency: string
  rate: string
}

export interface InvoiceCreate {
  type: string
  id: string
  merchant_id: string
  order_id: string
  create_date: number
  status: number
  pay_url: string
  user_id: number
  amount: string
  currency: string
}
