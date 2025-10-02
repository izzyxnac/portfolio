import { test, expect } from '@playwright/test';
import { heroData } from '@/data';

test.describe('Hero Section - Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays hero content correctly', async ({ page }) => {
    await expect(page.getByText(heroData.name)).toBeVisible();
    await expect(page.getByText(heroData.tagline)).toBeVisible();
    await expect(
      page.getByText(new RegExp(heroData.description.split(' ').slice(0, 3).join(' ')))
    ).toBeVisible();
  });

  test('has interactive call-to-action buttons', async ({ page }) => {
    // Wait for the page to fully load and animations to complete
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const viewProjectsButton = page.getByText('View Projects');
    const getInTouchButton = page.getByText('Get In Touch');

    await expect(viewProjectsButton).toBeVisible();
    await expect(getInTouchButton).toBeVisible();

    // Test that buttons are clickable
    await expect(viewProjectsButton).toBeEnabled();
    await expect(getInTouchButton).toBeEnabled();
  });

  test('displays profile image', async ({ page }) => {
    const profileImage = page.getByAltText(heroData.profileImageAlt);
    await expect(profileImage).toBeVisible();
  });

  test('is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Wait for the page to fully load and animations to complete
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await expect(page.getByText(heroData.name)).toBeVisible();
    await expect(page.getByText('View Projects')).toBeVisible();
  });

  test('has proper semantic structure', async ({ page }) => {
    const heroSection = page.getByRole('region', { name: /hero section/i });
    await expect(heroSection).toBeVisible();

    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toHaveText(heroData.name);
  });

  test('typing animation is present', async ({ page }) => {
    const typingContainer = page.locator('[aria-live="polite"]');
    await expect(typingContainer).toBeVisible();
  });
});
