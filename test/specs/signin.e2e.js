import { expect } from 'chai';

describe('Sign In', () => {
    it('Successful user authentication', async () => {
        await browser.url('https://www.saucedemo.com/');

        const usernameInput = await $('#user-name');
        await usernameInput.waitForDisplayed({ timeout: 5000 });
        await usernameInput.setValue('standard_user');

        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        await loginButton.click();

        const titleElement = await $('.title');
        await titleElement.waitForDisplayed({ timeout: 5000 });

        const isOverviewDisplayed = await titleElement.isDisplayed();
        expect(isOverviewDisplayed).to.be.true;

        const pageTitle = await titleElement.getText();
        expect(pageTitle).to.equal('Products');
    });
});