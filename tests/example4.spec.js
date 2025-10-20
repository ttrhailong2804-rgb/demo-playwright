import { test, expect } from '@playwright/test'

test.describe('ADD PRODUCT', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    });

    test('Product add to cart', async ({ page }) =>{
        await page.locator('.product:has-text("Brocolli") button').click();
        await expect(page.locator('.product:has-text("Brocolli") button')).toContainText('ADDED');

        // await expect(page.locator('.cart-count')).toHaveText('1');
        // await expect(page.locator('.cart-info')).toContainText('Price');
        const before = await page.locator('.cart-count').innerText();   
        await page.locator('.product:has-text("Cauliflower") button').click();
        await page.locator('.product:has-text("Cucumber") button').click();
        const after = await page.locator('.cart-count').innerText();    // Lấy số mới

        // Chuyển sang số để so sánh
        expect(Number(after)).toBe(Number(before) + 2);
    });
});