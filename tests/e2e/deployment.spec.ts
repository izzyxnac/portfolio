import { test, expect, type Page, type Request } from '@playwright/test';

test.describe('Deployment Verification', () => {
  test('should load homepage successfully', async ({ page }: { page: Page }) => {
    await page.goto('/');

    // Check that the page loads
    await expect(page).toHaveTitle(/AI\/ML Developer Portfolio/);

    // Check for basic page structure
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have proper meta tags for SEO', async ({ page }: { page: Page }) => {
    await page.goto('/');

    // Check for essential meta tags
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    const metaViewport = page.locator('meta[name="viewport"]');
    await expect(metaViewport).toHaveAttribute('content', /width=device-width/);
  });

  test('should have proper Open Graph tags', async ({ page }: { page: Page }) => {
    await page.goto('/');

    // Check for Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', /.+/);

    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveAttribute('content', /.+/);
  });

  test('should handle 404 pages gracefully', async ({ page }: { page: Page }) => {
    const response = await page.goto('/non-existent-page');

    // Should return 404 status
    expect(response?.status()).toBe(404);

    // Should show custom 404 page
    await expect(page.locator('h1')).toContainText(/404|Not Found/i);
  });

  test('should have proper security headers', async ({ page }: { page: Page }) => {
    const response = await page.goto('/');

    // Check for security headers
    const headers = response?.headers();

    expect(headers?.['x-content-type-options']).toBe('nosniff');
    expect(headers?.['x-frame-options']).toBe('DENY');
    expect(headers?.['x-xss-protection']).toBe('1; mode=block');
  });

  test('should be mobile responsive', async ({ page }: { page: Page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that content is visible and properly laid out
    await expect(page.locator('main')).toBeVisible();

    // Check that navigation works on mobile
    const nav = page.locator('nav');
    if (await nav.isVisible()) {
      await expect(nav).toBeVisible();
    }
  });

  test('should load all critical resources', async ({ page }: { page: Page }) => {
    const failedRequests: string[] = [];

    page.on('requestfailed', (request: Request) => {
      failedRequests.push(request.url());
    });

    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Check that no critical resources failed to load
    const criticalFailures = failedRequests.filter(
      url => url.includes('.css') || url.includes('.js') || url.includes('favicon')
    );

    expect(criticalFailures).toHaveLength(0);
  });
});
