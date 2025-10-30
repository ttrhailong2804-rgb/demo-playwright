import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Scrape product list and save to JSON (JS)', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
  await page.waitForSelector('.products-wrapper .product');

  const products = await page.$$eval('.product', (items) =>
    items.map((el) => {
      const name = el.querySelector('h4.product-name')?.textContent?.trim() || '';
      const price = el.querySelector('.product-price')?.textContent?.trim() || '';
      const image = el.querySelector('img')?.getAttribute('src') || '';
      return { name, price, image };
    })
  );

  const filePath = path.resolve('C:\\Automatic Testing\\tests\\rahulshettyacademy\\products.json');
  // Đảm bảo thư mục tồn tại
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');

  console.log(`✅ Saved ${products.length} products to ${filePath}`);
  expect(products.length).toBeGreaterThan(0);
});