import { test } from '../fixtures/pageManager';
import { writeFileSync } from 'fs';

interface ProductDetails {
  productTitle: string;
  productPrice: string;
  productLink: string;
}

test('basic test', async ({ actions, assert, mainPage }) => {
    test.step('Navigate to homepage', async () => {
        await mainPage.navigateTo('https://www.demoblaze.com/');
        await mainPage

        test.step('Verify the page URL and title', async () => {
            await assert.pageURLContains('https://www.demoblaze.com/');
            await assert.pageTitleIs('STORE');
        });
    });

    test.step('Validate Product Grid pressence and product card elements', async () => {
        test.step('Verify product grid is visible', async () => {
            await assert.elementIsVisible(mainPage.productGridSection.gridContainer);
        });
        test.step('Verify at least one product card is visible', async () => {
            await assert.elementIsVisible(mainPage.productGridSection.productCard.container.first());
        });
        test.step('Verify at least one product card shows correct information', async () => {
            await assert.elementIsVisible(mainPage.productGridSection.productCard.productName.first());
            await assert.elementIsVisible(mainPage.productGridSection.productCard.productPrice.first());
            await assert.elementIsVisible(mainPage.productGridSection.productCard.productDescription.first());
        });
    });

    const productList: ProductDetails[] = [];

    //Simplified locators for Card elements
    const pCards = await mainPage.productGridSection.productCard.container.all();
    const pCardTitle = mainPage.productGridSection.productCard.productName;
    const pCardPrice = mainPage.productGridSection.productCard.productPrice;

    pCards.forEach(async (card, index) => {
        test.step(`Store product card ${index + 1} information`, async () => {
            const productName = await mainPage.getTextFromElement(card.locator(pCardTitle));
            const productPrice = await mainPage.getTextFromElement(card.locator(pCardPrice));
            const productLink = await mainPage.getElementAttribute(card.locator(pCardTitle), 'href');

            test.step(`Push product card ${index + 1} information into an array`, async () => {
                productList.push({
                    productTitle: productName,
                    productPrice: productPrice,
                    productLink: productLink
                });
            });
        });
    });

    test.step(`Generate JSON file with Product List Details`, async () => {
        writeFileSync('ProductDetails.json', JSON.stringify(productList, null, 2));
    });
});
