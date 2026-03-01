import { test } from '../fixtures/pageManager';

const baseURL = 'https://www.demoblaze.com/';

test.describe(`Demoblaze Store - Mandatory Test #2`, { tag: ['@BLZ_002'] }, () => {
    test('Add Product to Cart and Place Order', async ({ actions, assert, mainPage, productPage }, testInfo) => {
        await test.step('Navigate to homepage', async () => {
            await mainPage.navigateTo(baseURL);

            await test.step('Verify the page URL and title', async () => {
                await assert.pageURLContains(baseURL);
                await assert.pageTitleIs('STORE');
            });
        });

        await test.step('Select first product from the list and click on it', async () => {
            const selectedProduct = mainPage.productGridSection.productCard.productLink.first();
            await actions.mouse.click(selectedProduct);

            await test.step('Verify the page URL and title', async () => {
                await assert.pageURLContains('prod.html');
                await assert.pageTitleIs('STORE');
            });

            await test.step('Verify the product details page is displayed', async () => {
                await assert.elementIsVisible(productPage.productTitle);
                await assert.elementIsVisible(productPage.productPrice);
                await assert.elementIsVisible(productPage.productDescription);
            });
        });

        await test.step('Click on "Add to Cart" button', async () => {
            await actions.mouse.click(productPage.addToCartButton);

            await test.step('Verify JS alert is displayed', async () => {
                await assert.alertMessageIs('Product added');
                await actions.mouse.dismissAlert();
            });
        });

        await test.step('Click on "Add to Cart" button, again', async () => {
            await actions.mouse.click(productPage.addToCartButton);

            await test.step('Verify JS alert is displayed', async () => {
                await assert.alertMessageIs('Product added');
                await actions.mouse.dismissAlert();
            });
        });

        await test.step('Click on "Cart" Link in the Header', async () => {
            await actions.mouse.click(mainPage.headerSection.cartLink);

            await test.step('Verify the page URL and title', async () => {
                await assert.pageURLContains('cart.html');
                await assert.pageTitleIs('STORE');
            });
        });

        await test.step('Verify products Name and Price in the Cart', async () => {
            await actions.mouse.click(mainPage.headerSection.cartLink);

            await test.step('Verify the page URL and title', async () => {
                await assert.pageURLContains('cart.html');
                await assert.pageTitleIs('STORE');
            });
        });
    });
});