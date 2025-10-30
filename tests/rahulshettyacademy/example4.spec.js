import { test, expect } from '@playwright/test'
import { productQtyData } from './shoppingList.data';
import { ProductListPage, CartPreview, CartPage, CheckoutPage } from './ProductListPage';

test.describe('ADD PRODUCT', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    });

    test('Input box', async ({ page }) =>{
        // await page.locator('input.search-keyword').fill('Brocolli');
        // await expect(page.locator('input.search-keyword')).toHaveValue('Brocolli');

        await page.getByPlaceholder('Search for Vegetables and Fruits').fill('Brocolli');
        await expect(page.getByPlaceholder('Search for Vegetables and Fruits')).toHaveValue('Brocolli');
        await expect(page.locator('.product:has-text("Brocolli")')).toBeVisible();

        await page.reload();

        await page.getByPlaceholder('Search for Vegetables and Fruits').fill('ghjgh');
        await expect(page.getByText('Sorry, no products matched your search!')).toBeVisible();
    });

        test('Stepper-inputPlus', async ({ page }) => {
        const qty = page.locator('.product:has-text("Brocolli") input.quantity');
        const PlusBtn = page.locator('.product:has-text("Brocolli") .increment');
        const MinusBtn = page.locator('.product:has-text("Brocolli") .decrement');

        const before = await qty.inputValue();
        await PlusBtn.click();
        const after = await qty.inputValue();

        expect(Number(after)).toBe(Number(before) + 1);

        const before1 = await qty.inputValue();
        await MinusBtn.click();
        const after1 = await qty.inputValue();

        expect(Number(after1)).toBe(Number(before1) - 1);
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

        await page.getByRole('button', {name: 'Place Order'}).click();
        await expect(page).toHaveURL('https://rahulshettyacademy.com/seleniumPractise/#/country');

        await page.locator('select').selectOption('Angola');
        // await page.getByRole('combobox').selectOption('Angola')
        // await page.getByLabel('Choose Country').selectOption('Angola');
        await expect(page.locator('select')).toHaveValue('Angola'); 
        
        await page.getByRole('button', { name: 'Proceed' }).click();
        await expect(page.getByText('Please accept Terms & Conditions - Required')).toBeVisible();

        await page.locator('input.chkAgree').check();
        await expect(page.locator('input.chkAgree')).toBeChecked();

        await page.getByRole('button', { name: 'Proceed' }).click();
        await expect(page.getByText('Thank you, your order has been placed successfully')).toBeVisible();
    });
});