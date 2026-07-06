import { expect } from 'chai';

describe('Search for an exact product', () => {
    it('Searching for an existing product by exact name', async () => {
        await browser.url('https://ecommerce-playground.lambdatest.io/');

        const searchInput = await $('input[name="search"]');
        await searchInput.waitForDisplayed({ timeout: 5000 });
        await searchInput.setValue('HTC Touch HD');

        await browser.keys('Enter');

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('search='),
            { timeout: 5000, timeoutMsg: 'Search results page did not load' }
        );

        const productLink = await $('a*=HTC Touch HD');
        await productLink.waitForDisplayed({ timeout: 5000 });

        const productName = await productLink.getText();
        expect(productName).to.include('HTC Touch HD');

        const totalProductsFound = (await $$('.product-layout')).length;
        expect(totalProductsFound).to.be.greaterThan(0);
    });
});