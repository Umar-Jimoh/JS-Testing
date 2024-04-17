import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from 'vitest'
import {
  Stack,
  calculateDiscount,
  canDrive,
  fetchData,
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
  it.each([
    { scenario: 'price < min', price: -10, result: false },
    { scenario: 'price = min', price: 0, result: true },
    { scenario: 'price between min and max', price: 50, result: true },
    { scenario: 'price = max', price: 100, result: true },
    { scenario: 'price > max', price: 101, result: false },
  ])('Should return  $result when $scenario', ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result)
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

describe('fetchData', () => {
  it('should return a promise that will resolve to an array of numbers', async () => {
    try {
      const result = await fetchData()
    } catch (error) {
      expect(error).toHaveProperty('reason')
      expect(error.reason).toMatch(/fail/i)
    }
  })
})

describe('Test suite', () => {
  beforeAll(() => {
    console.log('beforeAll called')
  })

  beforeEach(() => {
    console.log('beforeEach called')
  })

  afterAll(() => {
    console.log('afterAll called')
  })

  afterEach(() => {
    console.log('afterEach called')
  })

  it('test case 1', () => {})

  it('test case 1', () => {})
})

describe('stack', () => {
  let stack

  beforeEach(() => {
    stack = new Stack()
  })

  it('push should add an item to the stack', () => {
    stack.push(1)

    expect(stack.size()).toBe(1)
  })

  it('pop should remove and return an item in the stack', () => {
    stack.push(1)
    stack.push(2)

    expect(stack.pop()).toBe(2)
    expect(stack.size()).toBe(1)
  })

  it('pop should throw an Error if stack is empty', () => {
    expect(() => stack.pop()).toThrow(/empty/i)
  })

  it('peek should return the top item in the stack without removing it', () => {
    stack.push(1)
    stack.push(2)

    const peeekedItem = stack.peek()

    expect(peeekedItem).toBe(2)
    expect(stack.size()).toBe(2)
  })

  it('peek should throw an Error if stack is empty', () => {
    expect(() => stack.peek()).toThrow(/empty/i)
  })

  it('isEmpty should return true if stack is empty', () => {
    expect(stack.isEmpty()).toBe(true)
  })

  it('isEmpty should return false if stack is not empty', () => {
    stack.push(2)
    
    expect(stack.isEmpty()).toBe(false)
  })

  it('size should return the number of items in  the  stack', () => {
    stack.push(1)
    stack.push(2)

    expect(stack.size()).toBe(2)
  })

  it('clear should remove all items from the stack', () => {
    stack.push(2)
    stack.push(1)
    
    expect(stack.clear()).toBe()
    expect(stack.size()).toBe(0)
  })
})
