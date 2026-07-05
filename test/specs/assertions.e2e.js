import { assert, expect, should as initShould } from 'chai';

initShould();

describe('Demonstration of Chai Assertions in WDIO', () => {

    beforeEach(async () => {
        await browser.url('https://the-internet.herokuapp.com/');
    });

    it('Must perform a test using the EXPECT interface', async () => {
        const title = await browser.getTitle();

        // Перевірка типу даних та значення
        expect(title).to.be.a('string');
        expect(title).to.equal('The Internet');

        const subHeader = await $('h2').getText();
        expect(subHeader).to.include('Available Examples');
    });

    it('Must perform a check using the ASSERT interface', async () => {
        const url = await browser.getUrl();

        assert.typeOf(url, 'string');
        assert.equal(url, 'https://the-internet.herokuapp.com/');
        assert.include(url, 'the-internet');
    });

    it('Must perform the check using the SHOULD interface', async () => {
        const mainHeaderElement = await $('h1');
        const mainHeader = await mainHeaderElement.getText();

        mainHeader.should.be.a('string');
        mainHeader.should.equal('Welcome to the-internet');
    });
});