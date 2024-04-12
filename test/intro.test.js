import { describe, it, expect } from 'vitest'
import { max } from 'src/intro'

describe('max', () => {
  it('Should return the first argument if it is greater', () => {
    expect(max(2, 1)).toBe(2)
  })

  it('Should return the second argument if it is greater', () => {
    expect(max(1, 2)).toBe(2)
  })

  it('Should return the first argument if both are equal', () => {
    expect(max(2, 2)).toBe(2)
  })
})
