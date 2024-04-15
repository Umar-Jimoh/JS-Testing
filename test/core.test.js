import { describe, it, expect } from 'vitest'
import { calculateDiscount, getCoupons, validateUserInput } from '../src/core'

describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    const coupons = getCoupons()
    expect(Array.isArray(coupons)).toBe(true)
    expect(coupons.length).toBeGreaterThan(0)
  })

  it('should return an array with valid codes', () => {
    const coupons = getCoupons()
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code')
      expect(typeof coupon.code).toBe('string')
      expect(coupon.code).toBeTruthy()
    })
  })

  it('should return an array with valid  discounts', () => {
    const coupons = getCoupons()
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount')
      expect(typeof coupon.discount).toBe('number')
      expect(coupon.discount).toBeGreaterThan(0)
      expect(coupon.discount).toBeLessThan(1)
    })
  })
})

describe('calculateDiscount', () => {
  it('should return discounted price ifgiven valid', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9)
    expect(calculateDiscount(10, 'SAVE20')).toBe(8)
  })

  it('should handle non-numeic price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i)
  })

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i)
  })

  it('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i)
  })

  it('should handle invalid discount code', () => {
    expect(calculateDiscount('10', 'INVALID')).toMatch(/invalid/i)
  })
})

// note: NotComplited

describe('validateUserInput', () => {
  it('should return success if user input is valid', () => {
    expect(validateUserInput('umar', 19)).toMatch(/success/i)
  })

  it('should return an error if username is not a string', () => {
    expect(validateUserInput(10, 10)).toMatch(/invalid/i)
  })

  it('should return an error if username is less than 3 characters', () => {
    expect(validateUserInput('um', 10)).toMatch(/invalid/i)
  })

  it('should return an error if username is greater than 255 characters', () => {
    expect(validateUserInput('A'.repeat(256), 10)).toMatch(/invalid/i)
  })

  it('should return an error if age is not a number', () => {
    expect(validateUserInput('umar', '10')).toMatch(/invalid/i)
  })

  it('should return an error if age is less than 18', () => {
    expect(validateUserInput('umar', 17)).toMatch(/invalid/i)
  })
  it('should return an error if age is greater than 100', () => {
    expect(validateUserInput('umar', 101)).toMatch(/invalid/i)
  })

  it('should return an error if bothusername and age  are invalid', () => {
    expect(validateUserInput('', 0)).toMatch(/invalid/i)
  })
})
