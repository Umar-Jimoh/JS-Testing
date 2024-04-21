import { vi, it, expect, describe } from 'vitest'
import {
  getPriceInCurrency,
  getShippingInfo,
  login,
  renderPage,
  signUp,
  submitOrder,
} from '../src/mocking'
import { getExchangeRate } from '../src/libs/currency'
import { getShippingQuote } from '../src/libs/shipping'
import { trackPageView } from '../src/libs/analytics'
import { charge } from '../src/libs/payment'
import { sendEmail } from '../src/libs/email'
import security from '../src/libs/security'

vi.mock('../src/libs/currency')
vi.mock('../src/libs/shipping')
vi.mock('../src/libs/analytics')
vi.mock('../src/libs/payment')
vi.mock('../src/libs/email', async (importOriginal) => {
  const originalModule = await importOriginal()

  return {
    ...originalModule,
    sendEmail: vi.fn(),
  }
})

describe('test suite', () => {
  it('test case', () => {
    const greet = vi.fn()
    greet.mockImplementation((name) => `Hello ${name}`)

    const result = greet('Umar')
    console.log(result)
  })
})

describe('test suite', () => {
  it('test case', () => {
    const sendText = vi.fn()
    sendText.mockReturnValue('ok')

    const result = sendText('message')

    expect(sendText).toHaveBeenCalled('message')
    expect(result).toBe('ok')
  })
})

describe('getPiceInCurrency', () => {
  it('should return price in target currency', () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5)

    const price = getPriceInCurrency(10, 'AUD')

    expect(price).toBe(15)
  })
})

describe('getShippingInfo', () => {
  it('should return shipping unavailable  if qoute cannot be fetched', () => {
    vi.mocked(getShippingQuote).mockReturnValue(null)

    const result = getShippingInfo('London')

    expect(result).toMatch(/unavailable/i)
  })

  it('should return shipping info if qoute is fetched', () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 })

    const result = getShippingInfo('London')

    expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i)
  })
})

describe('renderPage', () => {
  it('should return correct content', async () => {
    const result = await renderPage()

    expect(result).toMatch(/content/i)
  })

  it('should call analytics', async () => {
    await renderPage()

    expect(trackPageView).toHaveBeenCalledWith('/home')
  })
})

describe('submitOrder', () => {
  const order = { totalAmount: 10 }
  const creditCard = { creditCardNumber: '12345' }

  it('should charge the customer', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' })

    await submitOrder(order, creditCard)

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount)
  })

  it('should return success when payment is successful', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' })

    const result = await submitOrder(order, creditCard)

    expect(result).toEqual({ success: true })
  })

  it('should return fail when payment is failed', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'failed' })

    const result = await submitOrder(order, creditCard)

    expect(result).toEqual({ success: false, error: 'payment_error' })
  })
})

describe('signUp', () => {
  const email = 'umarjimoh@hotmail.com'

  it('should return false if email is not valid', async () => {
    const result = await signUp('a')

    expect(result).toBe(false)
  })

  it('should return true if email is valid', async () => {
    const result = await signUp(email)

    expect(result).toBe(true)
  })

  it('should send a welcome email if email is valid', async () => {
    await signUp(email)

    expect(sendEmail).toHaveBeenCalled()

    const arg = vi.mocked(sendEmail).mock.calls[0]
    expect(arg[0]).toBe(email)
    expect(arg[1]).toMatch(/welcome/i)
  })
})

describe('login', () => {
  it('should email the one-time login code', async () => {
    const email = 'name@domain.com'
    const spy = vi.spyOn(security, 'generateCode')

    await login(email)

    const securityCode = spy.mock.results[0].value.toString()
    expect(sendEmail).toHaveBeenCalledWith(email, securityCode)
  })
})
