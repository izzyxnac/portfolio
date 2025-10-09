import { test, expect } from '@playwright/test';
import { heroData } from '@/data';

test.describe('Hero Section - Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays hero content correctly', async ({ page }) => {
    // Use more specific selectors to target hero section only
    const heroSection = page.getByLabel('Hero section');
    await expect(heroSection.getByRole('heading', { name: heroData.name })).toBeVisible();
    await expect(heroSection.getByText(heroData.tagline)).toBeVisible();
    await expect(
      heroSection.getByText(new RegExp(heroData.description.split(' ').slice(0, 3).join(' ')))
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
    // Target hero section specifically to avoid About section image
    const heroSection = page.getByLabel('Hero section');
    const profileImage = heroSection.getByRole('img', {
      name: heroData.profileImageAlt,
      exact: true,
    });
    await expect(profileImage).toBeVisible();
  });

  test('is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Wait for the page to fully load and animations to complete
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Use hero section specific selectors
    const heroSection = page.getByLabel('Hero section');
    await expect(heroSection.getByRole('heading', { name: heroData.name })).toBeVisible();
    await expect(heroSection.getByText('View Projects')).toBeVisible();
  });

  test('has proper semantic structure', async ({ page }) => {
    const heroSection = page.getByRole('region', { name: /hero section/i });
    await expect(heroSection).toBeVisible();

    // Target the h1 specifically within hero section
    const mainHeading = heroSection.getByRole('heading', { level: 1 });
    await expect(mainHeading).toHaveText(heroData.name);
  });

  test('typing animation is present', async ({ page }) => {
    const typingContainer = page.locator('[aria-live="polite"]');
    await expect(typingContainer).toBeVisible();
  });
});
