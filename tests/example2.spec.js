import { test, expect } from '@playwright/test';

test('user can search docs', async ({ page }) => {
  await page.goto('https://www.google.com/');           // 1) Mở trang
  await page.getByRole('combobox').fill('Viet Nam');
  await expect(page.getByRole('combobox')).toHaveValue('Viet Nam');
});
