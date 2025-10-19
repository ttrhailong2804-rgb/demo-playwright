import { test, expect } from '@playwright/test';

test.describe('Header & Navigation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
  });

  test('Navigation main by logo ', async ({ page }) => {
    
    await page.getByRole('link', { name: 'Demo Web Shop' }).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.getByRole('heading', { name: 'welcome to our store' })).toBeVisible();
  });

  test(' Register header ', async ({ page }) => {
    
    await page.getByRole('link', { name: 'register' }).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/register');
    await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
    await expect(page.getByText('Your Personal Details')).toBeVisible();

  });

  test('Navigation to Login', async ({ page }) => {

   await page.getByRole('link', { name: /log in/i }).click(); 
   await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
   await expect(page.getByRole('heading', { name: /Welcome,/i})).toBeVisible();
  
  });

  test('Navigation to Shopping Cart', async ({ page }) => {

    await page.getByRole('link', { name: /Shopping cart/ }).nth(0).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/cart');
    await expect(page.getByRole('heading', { name: 'Shopping cart', exact: true })).toBeVisible();

  });

  test('Navigation to wishlist', async ({ page}) => {

    await page.getByRole('link', {name: 'wishlist'}).nth(0).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/wishlist');
    await expect(page.getByRole('heading', {name: 'Wishlist', exact: true })).toBeVisible();

  });

  test('Input box', async ({ page }) => {

    await page.locator('input[name="q"]').fill('book');
    await expect(page.locator('input[name="q"]')).toHaveValue('book');

    await page.getByRole('button', { name: 'Search'}).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/search?q=book');

    //vì sao các locator dạng role/label/placeholder không nhận ra ô search????

  });
  
  test.afterEach(async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

  });


});
