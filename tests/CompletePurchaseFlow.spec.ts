import { test } from '../fixtures/pageManager';

const baseURL = 'https://www.demoblaze.com/';
const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
const orderDetails = {
    name: 'John Doe',
    country: 'USA',
    city: 'New York',
    creditCard: '4111 1111 1111 1111',
    month: '12',
    year: '2026'
};

test.describe(`Demoblaze Store - Mandatory Test #2`, { tag: ['@BLZ_002'] }, () => {
    test('Add Product to Cart and Place Order', async ({ actions, assert, mainPage, productPage, cartPage }) => {
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
            await test.step('Verify Product Table is visible', async () => {
                await assert.elementIsVisible(cartPage.inCartProducts.cartTable);
            });
            const productCount = await cartPage.getElementCount(cartPage.inCartProducts.productName);

            for (let index = 0; index < productCount; index++) {
                await test.step(`Verify Product #${index + 1} Details`, async () => {
                    await assert.elementIsVisible(cartPage.inCartProducts.productName.first());
                    await assert.elementIsVisible(cartPage.inCartProducts.productPrice.first());
                    await assert.elementIsVisible(cartPage.inCartProducts.deleteProductButton.first());
                });
            };
        });

        await test.step('Click on "Delete" link on first product', async () => {
            await actions.mouse.click(cartPage.inCartProducts.deleteProductButton.first());

            await test.step('Wait three seconds until page has reloaded', async () => {
                await actions.browser.waitUntilTimeout(3);
            });
            await test.step('Verify the product is removed from the cart', async () => {
                const productCount = await cartPage.getElementCount(cartPage.inCartProducts.productName);
                await assert.valueIs(productCount, 1);
            });
        });

        await test.step('Click on "Place Order" button', async () => {
            await actions.mouse.click(cartPage.placeOrderButton.first());

            await test.step('Verify Place Order Modal is displayed', async () => {
                await assert.elementIsVisible(cartPage.placeOrderModal.modalIdentifier);
            });
        });

        await test.step('Complete Purchase', async () => {
            await test.step('Fill all required fields for Purchase', async () => {
                await cartPage.placeOrderModal.fillOrderForm(orderDetails);
            });

            await test.step('Click on "Purchase" button', async () => {
                await cartPage.placeOrderModal.clickPurchaseInModal();

                await test.step('Verify Success Message is displayed', async () => {
                    await assert.elementIsVisible(cartPage.placeOrderModal.successMessage);
                });

                await test.step('Verify Success Message Details', async () => {
                    const successMessageDetails : string = await cartPage.placeOrderModal.getSuccessMessageDetails();

                    await assert.elementTextContains(cartPage.placeOrderModal.modalIdentifier, 'Thank you for your purchase!');

                    await assert.textContains(successMessageDetails, 'Amount:');
                    await assert.textContains(successMessageDetails, `Card Number: ${orderDetails.creditCard}`);
                    await assert.textContains(successMessageDetails, `Name: ${orderDetails.name}`);
                    await assert.textContains(successMessageDetails, `Date: ${currentDate}`);
                });

                await test.step('Click on "OK" button in Success Message', async () => {
                    await cartPage.placeOrderModal.clickSuccessMessageOK();

                    await test.step('Verify redirection to Home Page', async () => {
                        await assert.pageURLContains(baseURL);
                        await assert.pageTitleIs('STORE');
                    });
                });
            });
        });
    });
});