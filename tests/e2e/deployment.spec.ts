import { test, expect, type Page, type Request } from '@playwright/test';
import { config } from '@/lib/constants/config';

test.describe('Deployment Verification', () => {
  test('should load homepage successfully', async ({ page }: { page: Page }) => {
    await page.goto(config.site.url);

    // Check that the page loads
    await expect(page).toHaveTitle(new RegExp(config.site.title));

    // Check for basic page structure
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have proper meta tags for SEO', async ({ page }: { page: Page }) => {
    await page.goto(config.site.url);

    // Check for essential meta tags
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    const metaViewport = page.locator('meta[name="viewport"]');
    await expect(metaViewport).toHaveAttribute('content', /width=device-width/);
  });

  test('should have proper Open Graph tags', async ({ page }: { page: Page }) => {
    await page.goto(config.site.url);

    // Check for Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', /.+/);

    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveAttribute('content', /.+/);
  });

  test('should handle 404 pages gracefully', async ({ page }: { page: Page }) => {
    const response = await page.goto(config.site.url + '/non-existent-page');

    // Should return 404 status
    expect(response?.status()).toBe(404);

    // Should show custom 404 page
    await expect(page.locator('h1')).toContainText(/404|Not Found/i);
  });

  test('should have proper security headers', async ({ page }: { page: Page }) => {
    const response = await page.goto(config.site.url);

    // Check for security headers
    const headers = response?.headers();

    expect(headers?.['x-content-type-options']).toBe(config.security.contentTypeOptions);
    expect(headers?.['x-frame-options']).toBe(config.security.frameOptions);
    expect(headers?.['x-xss-protection']).toBe(config.security.xssProtection);
  });

  test('should be mobile responsive', async ({ page }: { page: Page }) => {
    // Test mobile viewport
    await page.setViewportSize(config.breakpoints.mobile);
    await page.goto(config.site.url);

    // Check that content is visible and properly laid out
    await expect(page.locator('main')).toBeVisible();

    // Check that navigation works on mobile
    const nav = page.locator('nav').first();
    if (await nav.isVisible()) {
      await expect(nav).toBeVisible();
    }
  });

  test('should load all critical resources', async ({ page }: { page: Page }) => {
    const failedRequests: string[] = [];

    page.on('requestfailed', (request: Request) => {
      failedRequests.push(request.url());
    });

    await page.goto(config.site.url);

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Check that no critical resources failed to load
    const criticalFailures = failedRequests.filter(
      url => url.includes('.css') || url.includes('.js') || url.includes('favicon')
    );

    expect(criticalFailures).toHaveLength(0);
  });
});
