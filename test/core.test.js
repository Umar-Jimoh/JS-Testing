import { describe, it, expect } from 'vitest'
import {
  calculateDiscount,
  canDrive,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from '../src/core'

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

describe('isPriceInRange', () => {
  it('should return false if price is outside the range', () => {
    expect(isPriceInRange(-10, 0, 100)).toBe(false)
    expect(isPriceInRange(101, 0, 100)).toBe(false)
  })

  it('should return true if price is equal to the min or the max', () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true)
    expect(isPriceInRange(100, 0, 100)).toBe(true)
  })

  it('should return true if price is within the range', () => {
    expect(isPriceInRange(50, 0, 100)).toBe(true)
  })
})

describe('isValidUsername', () => {
  const minlength = 5
  const maxlength = 15

  it('should return true if username is within the minlength and maxlength', () => {
    expect(isValidUsername('a'.repeat(minlength + 1))).toBe(true)
  })

  it('should return true if username is equal to the minlength orthe maxlength', () => {
    expect(isValidUsername('a'.repeat(minlength))).toBe(true)
    expect(isValidUsername('a'.repeat(maxlength))).toBe(true)
  })

  it('should return false if username is less than the minlength', () => {
    expect(isValidUsername('a'.repeat(minlength - 1))).toBe(false)
  })

  it('should return false if username is greater than the maxlength', () => {
    expect(isValidUsername('a'.repeat(maxlength + 1))).toBe(false)
  })

  it('should return false for invalid input types ', () => {
    expect(isValidUsername(null)).toBe(false)
    expect(isValidUsername(undefined)).toBe(false)
    expect(isValidUsername(1)).toBe(false)
  })
})

describe('canDrive', () => {
  it.each([
    { age: 15, country: 'US', result: false },
    { age: 16, country: 'US', result: true },
    { age: 17, country: 'US', result: true },
    { age: 16, country: 'UK', result: false },
    { age: 17, country: 'UK', result: true },
    { age: 18, country: 'UK', result: true },
  ])('should return $result if $age, $country', ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result)
  })
  it('should return false for invalide contry code', () => {
    expect(canDrive(18, 'IS')).toMatch(/invalid/i)
  })
})
