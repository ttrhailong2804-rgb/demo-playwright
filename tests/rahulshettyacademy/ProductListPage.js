import { expect } from '@playwright/test';

export class ProductListPage {
  constructor(page){ this.page = page; }
  productCard(name){ return this.page.locator(`.product:has-text("${name}")`); }
  qtyInput(name){ return this.productCard(name).locator('input.quantity'); }
  addBtn(name){ return this.productCard(name).locator('button'); }

  async setQty(name, qty){
    await this.qtyInput(name).fill(String(qty));
  }
  async addToCart(name){
    const btn = this.addBtn(name);
    await btn.click();
    await expect(btn).toContainText(/ADDED|ADD TO CART/i);
  }
  async addList(items){
    for (const it of items){
      await this.setQty(it.name, it.qty);
      await this.addToCart(it.name);
    }
  }
  async cartCount(){
    const txt = await this.page.locator('.cart-count').innerText();
    return Number(txt);
  }
}

export class CartPreview {
  constructor(page){ this.page = page; }
  async open(){ await this.page.locator('.cart-icon img[alt="Cart"]').click(); }
  items(){ return this.page.locator('.cart-preview.active .cart-item'); }
}

export class CartPage {
  constructor(page){ this.page = page; }
  async goto(){
    await this.page.getByRole('button', { name:'proceed to checkout' }).click();
    await expect(this.page).toHaveURL(/\/cart$/);
  }
  rows(){ return this.page.locator('#productCartTables tbody tr'); }
}

export class CheckoutPage {
  constructor(page){ this.page = page; }
  async placeOrderFlow(){
    await this.page.getByRole('button', { name:'Place Order' }).click();
    await expect(this.page).toHaveURL(/\/country$/);
    await this.page.locator('select').selectOption('Angola');
    await expect(this.page.locator('select')).toHaveValue('Angola');
    await this.page.getByRole('button', { name:'Proceed' }).click();
    await expect(this.page.getByText('Please accept Terms & Conditions - Required')).toBeVisible();
    await this.page.locator('input.chkAgree').check();
    await expect(this.page.locator('input.chkAgree')).toBeChecked();
    await this.page.getByRole('button', { name:'Proceed' }).click();
    await expect(this.page.getByText('Thank you, your order has been placed successfully')).toBeVisible();
  }
}
