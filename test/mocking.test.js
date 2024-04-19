import { vi, it, expect, describe } from 'vitest'

describe('test suite', () => {
    it('test case', () => {
        const greet = vi.fn()
        greet.mockResolvedValue('Hello')

        greet().then((result) => console.log(result))
        
    })
})