import { test, expect } from '@playwright/test'

test('has title', async ({ page }) =>{  
  await page.goto('https://demowebshop.tricentis.com/');

  await expect(page).toHaveTitle(/Demo Web Shop/);

});