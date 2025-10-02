// Barrel Exports Functionality Tests
// This file tests that barrel exports work correctly

import { describe, it, expect } from 'vitest';

const testComponentsBarrelExports = () => {
  describe('Components Barrel Exports', () => {
    it('should export from components/index.ts without errors', async () => {
      // Test that the barrel export file can be imported without throwing
      await expect(import('@/components')).resolves.toBeDefined();
    }, 10000);

    it('should export from components/ui/index.ts without errors', async () => {
      await expect(import('@/components/ui')).resolves.toBeDefined();
    });

    it('should export from components/layout/index.ts without errors', async () => {
      await expect(import('@/components/layout')).resolves.toBeDefined();
    });

    it('should export from components/sections/index.ts without errors', async () => {
      await expect(import('@/components/sections')).resolves.toBeDefined();
    });

    it('should export from components/common/index.ts without errors', async () => {
      await expect(import('@/components/common')).resolves.toBeDefined();
    });
  });
};

const testHooksBarrelExports = () => {
  describe('Hooks Barrel Exports', () => {
    it('should export from hooks/index.ts without errors', async () => {
      await expect(import('@/hooks')).resolves.toBeDefined();
    });
  });
};

const testUtilsBarrelExports = () => {
  describe('Utils Barrel Exports', () => {
    it('should export from lib/utils/index.ts without errors', async () => {
      await expect(import('@/lib/utils')).resolves.toBeDefined();
    });

    it('should export cn function from utils', async () => {
      const utils = await import('@/lib/utils');
      expect(utils.cn).toBeDefined();
      expect(typeof utils.cn).toBe('function');
    });

    it('should export date utilities', async () => {
      // Test direct import first to ensure the module works
      const dateUtils = await import('@/lib/utils/date');
      expect(dateUtils.formatDate).toBeDefined();
      expect(dateUtils.getRelativeTime).toBeDefined();
      expect(dateUtils.isToday).toBeDefined();

      // Then test barrel export
      const utils = await import('@/lib/utils/index');
      expect(utils.formatDate).toBeDefined();
      expect(utils.getRelativeTime).toBeDefined();
      expect(utils.isToday).toBeDefined();
    }, 10000);

    it('should export string utilities', async () => {
      const utils = await import('@/lib/utils/index');
      expect(utils.slugify).toBeDefined();
      expect(utils.capitalize).toBeDefined();
      expect(utils.toTitleCase).toBeDefined();
      expect(utils.truncate).toBeDefined();
      expect(utils.getReadingTime).toBeDefined();
    });

    it('should export formatting utilities', async () => {
      const utils = await import('@/lib/utils/index');
      expect(utils.formatNumber).toBeDefined();
      expect(utils.formatCurrency).toBeDefined();
      expect(utils.formatPercentage).toBeDefined();
      expect(utils.formatFileSize).toBeDefined();
      expect(utils.formatDuration).toBeDefined();
      expect(utils.formatList).toBeDefined();
    });

    it('should export validation utilities', async () => {
      const utils = await import('@/lib/utils/index');
      expect(utils.contactFormSchema).toBeDefined();
      expect(utils.newsletterSchema).toBeDefined();
      expect(utils.validateEmail).toBeDefined();
      expect(utils.validateUrl).toBeDefined();
    });
  });
};

const testConstantsBarrelExports = () => {
  describe('Constants Barrel Exports', () => {
    it('should export from lib/constants/index.ts without errors', async () => {
      await expect(import('@/lib/constants')).resolves.toBeDefined();
    });

    it('should export route constants', async () => {
      const constants = await import('@/lib/constants');
      expect(constants.ROUTES).toBeDefined();
      expect(constants.API_ROUTES).toBeDefined();
      expect(constants.EXTERNAL_ROUTES).toBeDefined();
    });

    it('should export config constants', async () => {
      const constants = await import('@/lib/constants');
      expect(constants.config.site).toBeDefined();
      expect(constants.config.meta).toBeDefined();
      expect(constants.config.security).toBeDefined();
      expect(constants.config.breakpoints).toBeDefined();
      expect(constants.config.api).toBeDefined();
      expect(constants.config.database).toBeDefined();
      expect(constants.config.analytics).toBeDefined();
      expect(constants.config.email).toBeDefined();
      expect(constants.config.features).toBeDefined();
      expect(constants.config.ui).toBeDefined();
      expect(constants.config.validation).toBeDefined();
      expect(constants.config.cache).toBeDefined();
      expect(constants.config.error).toBeDefined();
    });

    it('should export SEO constants', async () => {
      const constants = await import('@/lib/constants');
      expect(constants.config.meta).toBeDefined();
      expect(constants.config.meta.keywords).toBeDefined();
      expect(constants.config.meta.ogType).toBeDefined();
      expect(constants.config.meta.twitterCard).toBeDefined();
    });

    it('should export animation constants', async () => {
      const constants = await import('@/lib/constants');
      expect(constants.config.ui.animationDuration).toBeDefined();
      expect(constants.config.ui.debounceDelay).toBeDefined();
      expect(constants.config.ui.paginationLimit).toBeDefined();
    });

    it('should export validation constants', async () => {
      const constants = await import('@/lib/constants');
      expect(constants.config.validation.minPasswordLength).toBeDefined();
      expect(constants.config.validation.maxMessageLength).toBeDefined();
      expect(constants.config.validation.maxSubjectLength).toBeDefined();
      expect(constants.config.validation.maxNameLength).toBeDefined();
      expect(constants.config.validation.emailRegex).toBeDefined();
      expect(constants.config.validation.phoneRegex).toBeDefined();
    });
  });
};

const testTypesBarrelExports = () => {
  describe('Types Barrel Exports', () => {
    it('should export from lib/types/index.ts without errors', async () => {
      await expect(import('@/lib/types')).resolves.toBeDefined();
    });

    it('should export API types', async () => {
      const types = await import('@/lib/types');
      // Check that types are available (they won't have runtime values)
      expect(types).toBeDefined();
    });
  });
};

const testDataBarrelExports = () => {
  describe('Data Barrel Exports', () => {
    it('should export from data/index.ts without errors', async () => {
      await expect(import('@/data')).resolves.toBeDefined();
    });
  });
};

describe('Barrel Exports', () => {
  testComponentsBarrelExports();
  testHooksBarrelExports();
  testUtilsBarrelExports();
  testConstantsBarrelExports();
  testTypesBarrelExports();
  testDataBarrelExports();
});
