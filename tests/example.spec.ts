import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  const h1 = page.locator('h1');
  await expect(h1).toHaveText('ListTrackr');
});

test('navigate to login', async ({ page }) => {
  await page.goto('/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Log in' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Please log in to continue.' }),
  ).toBeVisible();
});
