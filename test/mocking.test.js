import { vi, it, expect, describe } from 'vitest'

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