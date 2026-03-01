import { test } from '../fixtures/pageManager';
import * as testData from '@test-data/testData';

test.describe(`Demoblaze Store - Mandatory Test #2`, { tag: ['@BLZ_002', '@ORDERS', '@E2E'] }, () => {
    test('Add Product to Cart and Place Order', async ({ actions, assert, mainPage, productPage, cartPage }) => {
        await test.step('Navigate to homepage', async () => {
            await mainPage.navigateTo(testData.baseURL);

            await test.step('Verify the page URL and title', async () => {
                await assert.pageURLContains(testData.baseURL);
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

        await test.step('Add Product to Cart', async () => {
            await Promise.all([
                test.step('Set JS alert listener to validate message', async () => {
                    await assert.alertMessageIs('Product added');
                }),
                test.step('Click "Add to Cart" button', async () => {
                    await actions.mouse.click(productPage.addToCartButton);
                })
            ]);
        });

        await test.step('Add Product to Cart, again', async () => {
            await Promise.all([
                test.step('Set JS alert listener to validate message', async () => {
                    await assert.alertMessageIs('Product added');
                }),
                test.step('Click "Add to Cart" button', async () => {
                    await productPage.clickAddToCart();
                })
            ]);
        });

        await test.step('Click on "Cart" Link in the Header', async () => {
            await mainPage.headerSection.clickCartLink();

            await test.step('Verify the page URL and title', async () => {
                await assert.pageURLContains('cart.html');
                await assert.pageTitleIs('STORE');
            });
        });

        await test.step('Validate products Name and Price in the Cart', async () => {
            await test.step('Verify Product Table is visible', async () => {
                await assert.elementIsVisible(cartPage.inCartProducts.cartTable);
            });
            const productCount = await cartPage.getElementCount(cartPage.inCartProducts.productName);

            for (let index = 0; index < productCount; index++) {
                await test.step(`Verify Product #${index + 1} Details`, async () => {
                    await assert.elementIsVisible(cartPage.inCartProducts.productName.nth(index));
                    await assert.elementIsVisible(cartPage.inCartProducts.productPrice.nth(index));
                    await assert.elementIsVisible(cartPage.inCartProducts.deleteProductButton.nth(index));
                });
            };
        });

        await test.step('Click on "Delete" link on first product', async () => {
            await actions.mouse.click(cartPage.inCartProducts.deleteProductButton.first());

            await test.step('Verify the product is removed from the cart', async () => {
                await assert.elementCountIs(cartPage.inCartProducts.productName, 1);
            });
        });

        await test.step('Click on "Place Order" button', async () => {
            await cartPage.placeOrder();

            await test.step('Verify Place Order Modal is displayed', async () => {
                await assert.elementIsVisible(cartPage.placeOrderModal.modalIdentifier);
            });
        });

        await test.step('[Negative validation] Attempt purchase without filling mandatory fields', async () => {
            await Promise.all([
                test.step('Set JS alert listener to validate message', async () => {
                    await assert.alertMessageIs('Please fill out Name and Creditcard.');
                }),
                test.step('Click "Purchase" button', async () => {
                    await cartPage.placeOrderModal.clickPurchaseInModal();
                })
            ]);
        });

        await test.step('Complete Purchase', async () => {
            await test.step('Fill all required fields for Purchase', async () => {
                await cartPage.placeOrderModal.fillOrderForm(testData.orderDetails);
            });

            await test.step('Click on "Purchase" button', async () => {
                await cartPage.placeOrderModal.clickPurchaseInModal();

                await test.step('Verify Success Message is displayed', async () => {
                    await assert.elementIsVisible(cartPage.placeOrderModal.successMessage);
                });

                await test.step('Verify Success Message Details', async () => {
                    const successMessageDetails : string = await cartPage.placeOrderModal.getSuccessMessageDetails();

                    await assert.elementTextContains(cartPage.placeOrderModal.successMessage, 'Thank you for your purchase!');

                    await assert.textContains(successMessageDetails, 'Id:');
                    await assert.textContains(successMessageDetails, 'Amount:');
                    await assert.textContains(successMessageDetails, `Card Number: ${testData.orderDetails.creditCard}`);
                    await assert.textContains(successMessageDetails, `Name: ${testData.orderDetails.name}`);
                    await assert.textContains(successMessageDetails, `Date: `);
                });

                await test.step('Click on "OK" button in Success Message', async () => {
                    await cartPage.placeOrderModal.clickSuccessMessageOK();

                    await test.step('Verify redirection to Home Page', async () => {
                        await assert.pageURLContains(testData.baseURL);
                        await assert.pageTitleIs('STORE');
                    });
                });
            });
        });
    });
});