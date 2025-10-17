import { test, expect, Page } from '@playwright/test';

// Helper function to setup test page
async function setupTestPage(page: Page) {
  await page.goto('/');
}

test.describe('Navigation - Header and Logo', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('header is visible and positioned absolutely', async ({ page }) => {
    // Check header is present
    const header = page.getByRole('banner');
    await expect(header).toBeVisible();

    // Check header has absolute positioning
    await expect(header).toHaveClass(/absolute/);
    await expect(header).toHaveClass(/top-0/);

    // Check header has transparent background
    await expect(header).toHaveClass(/bg-transparent/);
  });

  test('logo links to homepage', async ({ page }) => {
    const logo = page.getByLabel('Portfolio - Go to homepage');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '/');

    // Click logo and verify navigation
    await logo.click();
    await expect(page).toHaveURL('/');
  });
});
