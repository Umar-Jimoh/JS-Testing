import { vi, it, expect, describe } from 'vitest'

describe('test suite', () => {
    it('test case', () => {
        const greet = vi.fn()
        greet.mockReturnValue('Hello')

        const result = greet()
        console.log(result)
    })
})