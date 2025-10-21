import { test, expect } from '@playwright/test'
import { after } from 'node:test';

test.describe('ADD PRODUCT', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    });

    test('Input box', async ({ page }) =>{
        await page.locator('input.search-keyword').fill('Brocolli');
        await expect(page.locator('input.search-keyword')).toHaveValue('Brocolli');
        await expect(page.locator('.product:has-text("Brocolli")')).toBeVisible();

    });

    test('Product add to cart', async ({ page }) =>{
        await page.locator('.product:has-text("Brocolli") button').click();
        await expect(page.locator('.product:has-text("Brocolli") button')).toContainText('ADDED');
        const before = await page.locator('.cart-count').innerText();   

        await page.locator('.product:has-text("Cauliflower") button').click();
        await expect(page.locator('.product:has-text("Cauliflower") button')).toContainText('ADDED');

        await page.locator('.product:has-text("Cucumber") button').click();
        await expect(page.locator('.product:has-text("Cucumber") button')).toContainText('ADDED');

        const after = await page.locator('.cart-count').innerText();    

        expect(Number(after)).toBe(Number(before) + 2);

        await page.locator('.cart-icon img[alt="Cart"]').click();
        const cartItems = page.locator('.cart-preview.active .cart-item');
        await expect(cartItems).toHaveCount(3);

        await page.getByRole('button', {name:'proceed to checkout'}).click();
        await expect(page).toHaveURL('https://rahulshettyacademy.com/seleniumPractise/#/cart');

        const rows = page.locator('#productCartTables tbody tr');
        await expect(rows).toHaveCount(3);
    });

    test('Stepper-inputPlus', async ({ page }) => {
        const qty = page.locator('.product:has-text("Brocolli") input.quantity');
        const PlusBtn = page.locator('.product:has-text("Brocolli") .increment');

        const before = await qty.inputValue();
        await PlusBtn.click();
        const after = await qty.inputValue();

        expect(Number(after)).toBe(Number(before) + 1);

    });
});