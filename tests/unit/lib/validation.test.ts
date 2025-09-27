import { describe, it, expect } from 'vitest';
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  contactFormSchema,
  newsletterSchema,
  validateEmail,
  validateUrl,
  formatValidationErrors,
  type ContactFormData,
  type NewsletterData,
} from '@/lib/utils/validation';
import { z } from 'zod';

function testEmailSchema() {
  describe('emailSchema', () => {
    it('should validate correct email addresses', () => {
      const validEmails = ['test@example.com', 'user.name@domain.co.uk', 'user+tag@example.org'];

      validEmails.forEach(email => {
        expect(() => emailSchema.parse(email)).not.toThrow();
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = ['', 'invalid-email', '@example.com', 'user@', 'user@.com'];

      invalidEmails.forEach(email => {
        expect(() => emailSchema.parse(email)).toThrow();
      });
    });
  });
}

function testPasswordSchema() {
  describe('passwordSchema', () => {
    it('should validate strong passwords', () => {
      const validPasswords = ['Password123', 'MyStr0ngP@ss', 'Complex1Password'];

      validPasswords.forEach(password => {
        expect(() => passwordSchema.parse(password)).not.toThrow();
      });
    });

    it('should reject weak passwords', () => {
      const invalidPasswords = [
        'short',
        'nouppercase123',
        'NOLOWERCASE123',
        'NoNumbers',
        // too simple
        'password',
      ];

      invalidPasswords.forEach(password => {
        expect(() => passwordSchema.parse(password)).toThrow();
      });
    });
  });
}

function testNameSchema() {
  describe('nameSchema', () => {
    it('should validate proper names', () => {
      const validNames = [
        'John Doe',
        'Mary Jane',
        // Remove hyphen as it's not allowed in our regex
        'Jean Pierre',
        // Remove apostrophe as it's not allowed in our regex
        'OConnor',
      ];

      validNames.forEach(name => {
        expect(() => nameSchema.parse(name)).not.toThrow();
      });
    });

    it('should reject invalid names', () => {
      const invalidNames = [
        // too short
        'A',
        // contains numbers
        'John123',
        // contains special chars
        'Name@Domain',
        // too long
        'a'.repeat(51),
      ];

      invalidNames.forEach(name => {
        expect(() => nameSchema.parse(name)).toThrow();
      });
    });
  });
}

function testFormSchemas() {
  describe('contactFormSchema', () => {
    it('should validate complete contact form data', () => {
      const validData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message with enough content.',
        phone: '+1 (555) 123-4567',
      };

      expect(() => contactFormSchema.parse(validData)).not.toThrow();
    });

    it('should reject incomplete contact form data', () => {
      const invalidData = {
        // too short
        name: 'A',
        email: 'invalid-email',
        // too short
        subject: 'Hi',
        // too short
        message: 'Short',
      };

      expect(() => contactFormSchema.parse(invalidData)).toThrow();
    });
  });

  describe('newsletterSchema', () => {
    it('should validate newsletter subscription data', () => {
      const validData: NewsletterData = {
        email: 'user@example.com',
        firstName: 'John',
      };

      expect(() => newsletterSchema.parse(validData)).not.toThrow();
    });

    it('should validate newsletter data without firstName', () => {
      const validData = {
        email: 'user@example.com',
      };

      expect(() => newsletterSchema.parse(validData)).not.toThrow();
    });
  });
}

describe('Validation Schemas', () => {
  testEmailSchema();
  testPasswordSchema();
  testNameSchema();
  testFormSchemas();
});

function testValidateEmail() {
  describe('validateEmail', () => {
    it('should return true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });
}

function testValidateUrl() {
  describe('validateUrl', () => {
    it('should return true for valid URLs', () => {
      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('http://localhost:3000')).toBe(true);
      // empty is allowed
      expect(validateUrl('')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(validateUrl('not-a-url')).toBe(false);
      expect(validateUrl('just-text')).toBe(false);
    });
  });
}

function testFormatValidationErrors() {
  describe('formatValidationErrors', () => {
    it('should format Zod errors correctly', () => {
      const schema = z.object({
        email: z.string().email(),
        name: z.string().min(2),
      });

      try {
        schema.parse({ email: 'invalid', name: 'A' });
        // If no error is thrown, fail the test
        expect(true).toBe(false);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formatted = formatValidationErrors(error);
          expect(formatted).toHaveProperty('email');
          expect(formatted).toHaveProperty('name');
          expect(typeof formatted.email).toBe('string');
          expect(typeof formatted.name).toBe('string');
        } else {
          // If it's not a ZodError, fail the test
          expect(true).toBe(false);
        }
      }
    });

    it('should handle errors with no issues gracefully', () => {
      // Create a ZodError with empty issues by using an always-passing schema
      const schema = z.string().optional();

      try {
        // This should not throw, but if it did, we'd handle it
        schema.parse(undefined);

        // Create a minimal ZodError-like object for testing edge cases
        const mockError = new z.ZodError([]);
        const result = formatValidationErrors(mockError);
        expect(result).toEqual({});
      } catch (error) {
        // This shouldn't happen with optional schema, but handle it anyway
        if (error instanceof z.ZodError) {
          const result = formatValidationErrors(error);
          expect(typeof result).toBe('object');
        }
      }
    });
  });
}

describe('Validation Helper Functions', () => {
  testValidateEmail();
  testValidateUrl();
  testFormatValidationErrors();
});
