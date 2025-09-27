// Folder Structure Validation Tests
// This file tests that the required folder structure exists

import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = join(process.cwd(), 'src');

describe('Folder Structure', () => {
  describe('Components Directory Structure', () => {
    it('should have ui components directory', () => {
      expect(existsSync(join(PROJECT_ROOT, 'components', 'ui'))).toBe(true);
    });

    it('should have layout components directory', () => {
      expect(existsSync(join(PROJECT_ROOT, 'components', 'layout'))).toBe(true);
    });

    it('should have sections components directory', () => {
      expect(existsSync(join(PROJECT_ROOT, 'components', 'sections'))).toBe(true);
    });

    it('should have common components directory', () => {
      expect(existsSync(join(PROJECT_ROOT, 'components', 'common'))).toBe(true);
    });

    it('should have components barrel export', () => {
      expect(existsSync(join(PROJECT_ROOT, 'components', 'index.ts'))).toBe(true);
    });
  });

  describe('Hooks Directory Structure', () => {
    it('should have hooks directory', () => {
      expect(existsSync(join(PROJECT_ROOT, 'hooks'))).toBe(true);
    });

    it('should have hooks barrel export', () => {
      expect(existsSync(join(PROJECT_ROOT, 'hooks', 'index.ts'))).toBe(true);
    });
  });

  describe('Lib Directory Structure', () => {
    it('should have utils directory', () => {
      expect(existsSync(join(PROJECT_ROOT, 'lib', 'utils'))).toBe(true);
    });

    it('should have constants directory', () => {
      expect(existsSync(join(PROJECT_ROOT, 'lib', 'constants'))).toBe(true);
    });

    it('should have types directory', () => {
      expect(existsSync(join(PROJECT_ROOT, 'lib', 'types'))).toBe(true);
    });

    it('should have utils barrel export', () => {
      expect(existsSync(join(PROJECT_ROOT, 'lib', 'utils', 'index.ts'))).toBe(true);
    });

    it('should have constants barrel export', () => {
      expect(existsSync(join(PROJECT_ROOT, 'lib', 'constants', 'index.ts'))).toBe(true);
    });

    it('should have types barrel export', () => {
      expect(existsSync(join(PROJECT_ROOT, 'lib', 'types', 'index.ts'))).toBe(true);
    });
  });

  describe('Styles Directory Structure', () => {
    it('should have themes directory', () => {
      expect(existsSync(join(PROJECT_ROOT, 'styles', 'themes'))).toBe(true);
    });
  });

  describe('Data Directory Structure', () => {
    it('should have data directory', () => {
      expect(existsSync(join(PROJECT_ROOT, 'data'))).toBe(true);
    });

    it('should have data barrel export', () => {
      expect(existsSync(join(PROJECT_ROOT, 'data', 'index.ts'))).toBe(true);
    });
  });
});
