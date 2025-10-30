import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page){
        this.page = page;
        this.email = "#Email";
        this.password = '#Password';
        this.remember = '#RememberMe';
        this.loginBtn = this.page.getByRole('button', { name: 'Log in' }); // ✅ chuẩn

        // this.loginBtn = 'input[value="Log in"]';
    }


    async loginAs(email, password){
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        await this.page.check(this.remember);
        await this.loginBtn.click()

        // await this.page.click(this.loginBtn);      
    }

    async expectSuccess() {
        await expect(this.page).toHaveURL('https://demowebshop.tricentis.com/');
        await expect(this.page.getByText('Log out')).toBeVisible();
    }

    async expectEmptyfields() {
        await expect(this.page.getByText('Login was unsuccessful')).toBeVisible();
    }
    async expectNonExistentAccount() {
        await expect(this.page.getByText('No customer account found')).toBeVisible();
    }
    async InvalidEmailFormat() {
        await expect(this.page.getByText('Please enter a valid email address.')).toBeVisible();
    }
}