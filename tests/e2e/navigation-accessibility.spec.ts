import { test, expect, Page } from '@playwright/test';

// Helper function to setup test page
async function setupTestPage(page: Page) {
  await page.goto('/');
}

// Helper function to test viewport behavior
async function testViewportBehavior(page: Page, viewport: { width: number; height: number }) {
  await page.setViewportSize(viewport);

  const header = page.getByRole('banner');
  await expect(header).toBeVisible();

  if (viewport.width < 1024) {
    // Mobile/tablet: menu button should be visible
    await expect(page.getByLabel('Open menu')).toBeVisible();
  } else {
    // Desktop: navigation should be visible
    const desktopNav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(desktopNav).toBeVisible();
  }
}

test.describe('Navigation - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('skip navigation accessibility', async ({ page }) => {
    // Focus skip navigation directly (use .first() to handle potential duplicates)
    const skipNav = page.getByText('Skip to main content').first();
    await skipNav.focus();
    await expect(skipNav).toBeFocused();

    // Test skip navigation functionality
    await skipNav.click();

    // Should focus main content area
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('keyboard navigation support', async ({ page }) => {
    // Test tab navigation through header elements
    // Focus on the logo directly
    const logo = page.getByLabel('Portfolio - Go to homepage');
    await logo.focus();
    await expect(logo).toBeFocused();

    // Continue tabbing through navigation items
    await page.keyboard.press('Tab');

    // Should focus first navigation item or mobile menu button
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Test Enter key activation
    await page.keyboard.press('Enter');

    // Should navigate or open menu depending on focused element
    // This will vary based on viewport size
  });

  test('responsive design breakpoints', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      // Mobile
      { width: 320, height: 568 },
      // Tablet
      { width: 768, height: 1024 },
      // Desktop
      { width: 1024, height: 768 },
      // Large desktop
      { width: 1920, height: 1080 },
    ];

    for (const viewport of viewports) {
      await testViewportBehavior(page, viewport);
    }
  });
});
