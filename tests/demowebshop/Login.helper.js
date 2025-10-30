import { expect } from "@playwright/test";

export async function login(page) {
  const email = 'johnmfwick@damn1.com';    
  const password = 'John123';

  await page.goto('https://demowebshop.tricentis.com/login');
  await page.fill('#Email', email);
  await page.fill('#Password', password);
  await page.check('#RememberMe');
  await page.getByRole('button', { name: /log in/i }).click();

  await expect(page).toHaveURL('https://demowebshop.tricentis.com/')
  await expect(page.getByText('Log out')).toBeVisible();
}