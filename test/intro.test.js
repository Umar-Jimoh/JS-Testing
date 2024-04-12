import { describe, it, expect } from 'vitest'
import { max, fizzBuzz } from 'src/intro'

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

describe('fizzBuzz', () => {
    it('should return fizzbuzz if the arg is divisible by 3 and 5', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz')
    })

    it('should return Fizz if the arg is only divisible by 3', () => {
      expect(fizzBuzz(3)).toBe('Fizz')
    })

    it('should return Buzz if the arg is only divisible by 5', () => {
      expect(fizzBuzz(5)).toBe('Buzz')
    })

    it('should return arg as a string if is not divisible by 3 or 5', () => {
      expect(fizzBuzz(2)).toBe('2')
    })
})