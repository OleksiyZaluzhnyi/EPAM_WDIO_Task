import { expect } from 'chai';

describe('Search for an exact product', () => {
    it('Searching for an existing product by exact name', async () => {e
        await browser.url('https://ecommerce-playground.lambdatest.io/');

        const searchInput = await $('input[name="search"]');
        await searchInput.waitForDisplayed({ timeout: 5000 });
        await searchInput.setValue('Pliers');
        await browser.keys('Enter');

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('search='),
            { timeout: 5000, timeoutMsg: 'Search results page did not load' }
        );

        const productCards = await $$('.product-layout');
        expect(productCards.length).to.be.greaterThan(0, 'No products were found for "Pliers"');

        const productNames = await Promise.all(
            productCards.map(async (card) => {
                const nameEl = await card.$('h4 a, h3 a, .caption a');
                const text = await nameEl.getText();
                return text.trim();
            })
        );

        const uniqueNames = [...new Set(productNames)];
        expect(uniqueNames).to.deep.equal(['Pliers']);
    });
});