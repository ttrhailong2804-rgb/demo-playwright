import { test, expect } from '@playwright/test';
import { execPath } from 'process';

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

  test('Invalid login error', async ({ page }) => {
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Login was unsuccessful')).toBeVisible();

    await page.fill('#Email', '1234');
    await page.getByRole('button', {name: 'Log in'}).click();
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();

    await page.reload();

     //Account does not exist
    await page.fill('#Email', '123@damn1.com');
    await page.fill('#Password', 'John123')
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('No customer account found')).toBeVisible();
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

  //test('Existing user error', async ({ page }) =>{
    
  //});

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

test.describe('Category Listing (filter & sort)', () =>{
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
  });

  test('Electronics navigation', async ({ page }) => {
    await page.getByRole('link', { name: 'electronics'}).nth(0).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/electronics');

    await page.getByRole('link', { name: 'camera, photo'}).nth(0).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/camera-photo');

    await page.goBack();

    await page.getByRole('link', { name: 'camera, photo'}).nth(1).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/camera-photo');

    await page.goBack();

    await page.getByRole('link', { name: 'camera, photo'}).nth(2).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/camera-photo');
  })

   test('Electronics product page', async ({ page }) => {
    await page.getByRole('link', { name: 'electronics'}).nth(0).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/electronics');

    await page.getByRole('link', { name: 'camera, photo'}).nth(0).click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/camera-photo');

    await page.locator('#products-orderby').selectOption('Price: Low to High');
    await expect(page).toHaveURL(/orderby=10/);
    //await expect(page.locator('#products-orderby')).toHaveValue(/orderby=10/);

    await page.locator('#products-pagesize').selectOption('12');
    await expect(page).toHaveURL(/pagesize=12/);

    await page.locator('#products-viewmode').selectOption('List');
    await expect(page).toHaveURL(/viewmode=list/);
  })

  test('Product cart', async ({ page }) => {

    await page.locator('a:has-text("14.1-inch Laptop")').locator('xpath=../..') .getByRole('button', { name: 'Add to cart' }).click();
    
    //const toast = page.locator('.bar-notification.success');
    //await toast.waitFor({ state: 'visible', timeout: 10000 });
    //await expect(toast).toContainText('The product has been added');
    //toast.waitFor({ state: 'hidden' });

    const successMsg = page.getByText('The product has been added to your shopping cart', { exact: false });
    await expect(successMsg).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#topcartlink')).toContainText(/\(1\)/);

    //const qty = page.locator('#topcartlink .cart-qty');     
    //await expect(qty).toHaveText('(1)', { timeout: 10000 }); 
  });
});