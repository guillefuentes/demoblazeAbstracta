import { test } from '../fixtures/pageManager';

import * as testData from '@test-data/testData';

const uniqueDate = new Date().getTime(); // Using timestamp to ensure uniqueness
const uniqueUsername = `user_${uniqueDate}`;
const uniquePassword = `pass_${uniqueDate}`;

let guestProductName : string;

test.describe(`Demoblaze Store - Optional Test #1`, { tag: ['@BLZ_003', '@ACCOUNT'] }, () => {
    test('Validate User-scoped Cart with New User', async ({ actions, assert, mainPage, productPage, cartPage }) => {
        await test.step('Navigate to homepage', async () => {
            await mainPage.navigateTo(testData.baseURL);

            await test.step('Verify the page URL and title', async () => {
                await assert.pageURLContains(testData.baseURL);
                await assert.pageTitleIs('STORE');
                await assert.elementIsVisible(mainPage.carrouselContainer);
            });
        });

        await test.step('Add Product to Cart as Guest User', async () => {
            await test.step('Open first listed product from the Grid', async () => {
                await mainPage.openProductDetailsPage({ productIndex: 0 });

                await test.step('Verify the user is redirected correctly', async () => {
                    await assert.pageURLContains('prod.html');
                    await assert.pageTitleIs('STORE');
                    await assert.elementIsVisible(productPage.addToCartButton);
                });
            });

            await test.step('Add Product to Cart', async () => {
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
                    await assert.elementIsVisible(cartPage.placeOrderButton);
                });
            });

            await test.step('Verify the added product is present in the cart', async () => {
                await assert.elementIsVisible(cartPage.inCartProducts.productName.first());
            });

            guestProductName =
                await test.step('Store the added product name for later validations', async () => {
                    return await cartPage.getTextFromElement(cartPage.inCartProducts.productName.first()) ?? '';
                });
        });

        await test.step('Navigate back to homepage', async () => {
            await mainPage.navigateTo(testData.baseURL);

            await test.step('Verify the page URL and title', async () => {
                await assert.pageURLContains(testData.baseURL);
                await assert.pageTitleIs('STORE');
                await assert.elementIsVisible(mainPage.carrouselContainer);
            });
        });

        await test.step('Click on "Sign Up" link in the header', async () => {
            await mainPage.headerSection.clickSignUpLink();

            await test.step('Verify Sign Up Modal is displayed', async () => {
                await assert.elementIsVisible(mainPage.signUpModal.modalIdentifier);
            });
        });

        await test.step('Fill in the Sign Up form and submit', async () => {
            await Promise.all([
                test.step('Set JS alert listener to validate message', async () => {
                    await assert.alertMessageIs('Sign up successful.');
                }),
                test.step('Sign Up a new Account with unique credentials', async () => {
                    await mainPage.signUpModal.signUp(uniqueUsername, uniquePassword);
                })
            ]);

            await test.step('Verify the Sign Up Modal is closed after successful sign up', async () => {
                await assert.elementIsNotVisible(mainPage.signUpModal.modalIdentifier);
            });
        });

        await test.step('[Negative Validation] Attempt to Sign Up with the same username again', async () => {
            await actions.browser.waitUntilTimeout(2);

            await test.step('Click on "Sign Up" link in the header', async () => {
                await mainPage.headerSection.clickSignUpLink();

                await test.step('Verify Sign Up Modal is displayed', async () => {
                    await assert.elementIsVisible(mainPage.signUpModal.modalIdentifier);
                });
            });

            await test.step('Fill in the Sign Up form and submit', async () => {
                await Promise.all([
                    test.step('Set JS alert listener to validate message', async () => {
                        await assert.alertMessageIs('This user already exist.');
                    }),
                    test.step('Sign Up a new Account with previously used credentias', async () => {
                        await mainPage.signUpModal.signUp(uniqueUsername, uniquePassword);
                    })
                ]);

                await test.step('Verify the Sign Up Modal is still present after failed sign up', async () => {
                    await assert.elementIsVisible(mainPage.signUpModal.modalIdentifier);
                });
            });

            await test.step('Click on "Close" button in the Modal', async () => {
                await mainPage.signUpModal.closeModal();

                await test.step('Verify Sign Up Modal is closed', async () => {
                    await assert.elementIsNotVisible(mainPage.signUpModal.modalIdentifier);
                });
            });
        });

        await test.step('Log In with newly created user', async () => {
            await test.step('Click on "Log In" link in the header', async () => {
                await mainPage.headerSection.clickLogInLink();

                await test.step('Verify Log In Modal is displayed', async () => {
                    await assert.elementIsVisible(mainPage.logInModal.modalIdentifier);
                });
            });

            await test.step('Fill in the Log In form and submit', async () => {
                await mainPage.logInModal.logIn(uniqueUsername, uniquePassword);

                await test.step('Verify Log In Modal is closed after successful log in', async () => {
                    await assert.elementIsNotVisible(mainPage.logInModal.modalIdentifier);
                });

                await test.step('Verify header displays username', async () => {
                    await assert.elementIsVisible(mainPage.headerSection.usernameDisplay);
                    await assert.elementTextIs(mainPage.headerSection.usernameDisplay, `Welcome ${uniqueUsername}`);
                });

                await test.step('Verify header now shows "Log Out" link', async () => {
                    await assert.elementIsVisible(mainPage.headerSection.logOutLink);
                });
            });
        });

        await test.step('Add Product to Cart, as Logged In User', async () => {
            await test.step('Open second listed product from the Grid', async () => {
                await mainPage.openProductDetailsPage({ productIndex: 1 });

                await test.step('Verify the user is redirected correctly', async () => {
                    await assert.pageURLContains('prod.html');
                    await assert.pageTitleIs('STORE');
                    await assert.elementIsVisible(productPage.addToCartButton);
                });
            });

            await test.step('Add Product to Cart', async () => {
                await Promise.all([
                    test.step('Set JS alert listener to validate message', async () => {
                        //NOTE: Logged Users Alert has a '.' at the end of the message.
                        await assert.alertMessageIs('Product added.');
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
                    await assert.elementIsVisible(cartPage.placeOrderButton);
                });
            });

            await test.step('Verify the added product is present in the cart', async () => {
                await assert.elementIsVisible(cartPage.inCartProducts.productName.first());
            });

            await test.step('Verify the previously added product as guest is not present in the cart anymore', async () => {
                await assert.elementIsNotVisible(cartPage.inCartProducts.cartTable.filter({ hasText: guestProductName }));
            });
        });

        await test.step('Log Out from the account', async () => {
            await mainPage.headerSection.clickLogOutLink();

            await test.step('Verify header shows "Log in" and "Sign up" links again', async () => {
                await assert.elementIsVisible(mainPage.headerSection.logInLink);
                await assert.elementIsVisible(mainPage.headerSection.signUpLink);
            });

            await test.step('Verify header does not display username', async () => {
                await assert.elementIsNotVisible(mainPage.headerSection.usernameDisplay);
            });
        });

        await test.step('Validate Cart shows Guest User products after Log Out', async () => {
            await test.step('Click on "Cart" Link in the Header', async () => {
                await mainPage.headerSection.clickCartLink();

                await test.step('Verify the page URL and title', async () => {
                    await assert.pageURLContains('cart.html');
                    await assert.pageTitleIs('STORE');
                    await assert.elementIsVisible(cartPage.placeOrderButton);
                });
            });

            await test.step('Verify the previously added product as guest is present in the cart again', async () => {
                await assert.elementIsVisible(cartPage.inCartProducts.cartTable.filter({ hasText: guestProductName }));
            });
        });
    });
});