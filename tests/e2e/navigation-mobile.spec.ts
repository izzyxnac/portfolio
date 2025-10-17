import { test, expect, Page } from '@playwright/test';

// Helper function to setup test page
async function setupTestPage(page: Page) {
  await page.goto('/');
}

test.describe('Navigation - Mobile Menu', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('mobile menu functionality', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Desktop navigation should not be visible on mobile
    const desktopNav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(desktopNav).not.toBeVisible();

    // Mobile menu button should be visible
    const menuButton = page.getByLabel('Open menu');
    await expect(menuButton).toBeVisible();

    // Open mobile menu
    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Check mobile menu is visible
    await expect(page.locator('#mobile-menu').getByText('Navigation')).toBeVisible();

    // Check all navigation items are present in mobile menu
    const mobileNavItems = ['Home', 'About', 'Projects', 'Blog', 'Contact'];
    for (const item of mobileNavItems) {
      await expect(page.locator('#mobile-menu nav').getByText(item)).toBeVisible();
    }

    // Test navigation from mobile menu
    // Mobile menu version
    await page.locator('#mobile-menu nav').getByText('About').click();
    await expect(page).toHaveURL('/about');

    // Menu should close after navigation
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu close functionality', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const menuButton = page.getByLabel('Open menu');

    // Open mobile menu
    await menuButton.click();
    await expect(page.locator('#mobile-menu').getByText('Navigation')).toBeVisible();

    // Close with close button
    await page.getByLabel('Close menu').click();
    // Small delay to allow state update
    await page.waitForTimeout(100);
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Open again
    await menuButton.click();

    // Close with overlay click
    await page.getByTestId('mobile-menu-overlay').click({ force: true });
    // Small delay to allow state update
    await page.waitForTimeout(100);
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
