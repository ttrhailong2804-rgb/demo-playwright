import { test, expect } from '@playwright/test'
import { productQtyData } from './shoppingList.data';
import { ProductListPage, CartPreview, CartPage, CheckoutPage } from './ProductListPage';

test.describe('SHOP – 8 products × 20 each', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    await page.waitForSelector('.products-wrapper .product');
  });

  test('Set qty → Add to cart → Check cart → Checkout', async ({ page }) => {
    const productList = new ProductListPage(page);
    const preview = new CartPreview(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

     // 1) Add 8 sản phẩm × 20
    await productList.addList(productQtyData);

    const expectedDistinct = new Set(productQtyData.map(i => i.name)).size; // 8
    const headerCount = await productList.cartCount();                      // .cart-count
    expect(headerCount).toBe(expectedDistinct);

    // 3) Mini cart có 8 dòng
    await preview.open();
    await expect(preview.items()).toHaveCount(expectedDistinct);
   

    // 4) Trang cart có 8 dòng
    await cart.goto();
    await expect(cart.rows()).toHaveCount(expectedDistinct);

    // 4b) Tổng quantity trong bảng = tổng qty từ data
    const expectedTotalQty = productQtyData.reduce((s, i) => s + i.qty, 0); // 160

    const totalQty = await page.$$eval('#productCartTables tbody tr td:nth-child(3)', tds =>
     tds.reduce((sum, td) => {
        const txt = td.textContent || '';
        const m = txt.match(/\d+/);               // bắt số trong ô "20"
            return sum + (m ? Number(m[0]) : 0);
  }, 0)
);

expect(totalQty).toBe(expectedTotalQty);


    // 5) Thanh toán
    await checkout.placeOrderFlow();
  });
});
