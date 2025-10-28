import { test, expect, Page } from '@playwright/test';

// Helper function to setup test page
async function setupTestPage(page: Page) {
  await page.goto('/');
}

test.describe('Navigation - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestPage(page);
  });

  test('desktop navigation is functional', async ({ page }) => {
    // Test on desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Check all navigation items are visible
    const navItems = ['Home', 'About', 'Projects', 'Blog', 'Contact'];

    for (const item of navItems) {
      const navLink = page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name: item });
      await expect(navLink).toBeVisible();
    }

    // Test navigation to different pages
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');

    await page.getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL('/projects');
  });

  test('active navigation highlighting', async ({ page }) => {
    // Set viewport to desktop to ensure navigation is visible
    await page.setViewportSize({ width: 1200, height: 800 });

    // Navigate to different pages and check active states
    await page.goto('/about');

    // Wait for navigation to be visible
    await page.waitForSelector('nav[aria-label="Main navigation"]', { state: 'visible' });

    const aboutLink = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'About' });

    // Check if active styles are applied
    await expect(aboutLink).toHaveClass(/text-primary\/80/);
    await expect(aboutLink).toHaveClass(/bg-accent\/20/);
  });
});
