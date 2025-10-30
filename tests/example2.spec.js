import { test, expect } from '@playwright/test';

test.describe('Login Function', () => {

  // Chạy 1 lần trước tất cả test
  test.beforeAll(async ({ browser }) => {
    console.log('🔧 Setup: Mở browser và chuẩn bị dữ liệu...');
  });

  // Chạy trước mỗi test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/login');
  });

  // Test case 1
  test('Empty login form shows error', async ({ page }) => {
    await page.click('button[name="login"]');
    await expect(page.getByText('Login was unsuccessful')).toBeVisible();
  });

  // Test case 2
  test('Invalid email shows validation', async ({ page }) => {
    await page.fill('#Email', 'abc');
    await page.click('button[name="login"]');
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  });

  // Chạy sau mỗi test
  test.afterEach(async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
  });

  // Chạy sau tất cả test
  test.afterAll(async () => {
    console.log('🧹 Cleanup: Đóng browser, xóa session.');
  });
});
