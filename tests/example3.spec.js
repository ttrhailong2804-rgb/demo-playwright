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

    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/search?q=book');

  });
  
  test.afterEach(async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

  });


});

test.describe('Login Function', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/login');
  });

  test('Login features - Register no in4', async ({ page }) => {
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/register')

    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByText('First name is required.')).toBeVisible();
    await expect(page.getByText('Last name is required.')).toBeVisible();
    await expect(page.getByText('Email is required.')).toBeVisible();
    await expect(page.getByText('Password is required.').nth(0)).toBeVisible();  
    await expect(page.getByText('Password is required.').nth(1)).toBeVisible(); 
  });

  test('Login features - Register with in4', async ({ page }) => {
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/register');

    await page.getByLabel('Male', {exact: true}).check();
    await expect(page.getByLabel('Male', { exact: true })).toBeChecked();

    await page.getByLabel('Female', { exact: true }).check();
    await expect(page.getByLabel('Female', { exact: true})).toBeChecked();

    await page.getByLabel('First name:').fill('John');
    await expect(page.getByLabel('First name:')).toHaveValue('John');

    await page.getByLabel('Last name:').fill('Wick');
    await expect(page.getByLabel('Last name:')).toHaveValue('Wick');

    await page.getByLabel('Email:').fill('johnmfwick@damn1.com');
    await expect(page.getByLabel('Email:')).toHaveValue('johnmfwick@damn1.com');

    await page.getByLabel('Password:', {exact: true}).fill('John123');
    await expect(page.getByLabel('Password:', {exact: true})).toHaveValue('John123');

    await page.getByLabel('Confirm password:').fill('John123');
    await expect(page.getByLabel('Confirm password:')).toHaveValue('John123');

    //await page.getByRole('button', {name: 'Register'}).click();
    //await expect(page.getByText('Your registration completed')).toBeVisible();
  });

  test('Login account', async ({ page }) => {
    await page.fill('#Email', 'johnmfwick@damn1.com');
    await page.fill('#Password', 'John123')

    await page.check('#RememberMe');
    await expect(page.locator('#RememberMe')).toBeChecked();

    await page.getByRole('button', { name: 'log in' }).click();
    
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/')
    await expect(page.getByText('Log out')).toBeVisible();
  });

});