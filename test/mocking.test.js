import { vi, it, expect, describe } from 'vitest'
import { getPriceInCurrency } from '../src/mocking'
import { getExchangeRate } from '../src/libs/currency'

vi.mock('../src/libs/currency')

describe('test suite', () => {
    it('test case', () => {
        const greet = vi.fn()
        greet.mockImplementation((name) => `Hello ${name}`)

        const result = greet('Umar')
        console.log(result);
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