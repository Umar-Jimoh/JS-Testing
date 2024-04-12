import { describe, it, expect } from 'vitest'
import { factorial } from '../src/factorial'

describe('factorial', () => {
  it('should return 0 if arg is 0', () => {
    expect(factorial(0)).toBe(1)
  })

  it('should return 1 if arg is 1', () => {
    expect(factorial(1)).toBe(1)
  })

  it('should return 2 if given 2', () => {
    expect(factorial(2)).toBe(2)
  })

  it('should return 6 if 3 is given', () => {
    expect(factorial(3)).toBe(6)
  })

  it('should return undefined if negative value is given', () => {
    expect(factorial(-3)).toBe(undefined)
  })
})
