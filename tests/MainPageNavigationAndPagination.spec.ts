import { Locator } from '@playwright/test';
import { test } from '../fixtures/pageManager';
import * as testData from '../test-data/testData';
import * as helpers from '@helpers/productHelpers';

test.describe('Demoblaze Store - Additional Test #2', { tag: ['@BLZ_004'] }, () => {
    test('Validate Main Page Navigation and Pagination', async ({ actions, assert, mainPage }) => {

        //Common Use for Category and Pagination Validations
        const productNames = mainPage.productGridSection.productCard.productName;
        const getProductName = async (l: Locator) => (await mainPage.getTextFromElement(l)) ?? '';

        await test.step('Navigate to homepage', async () => {
            await mainPage.navigateTo(testData.baseURL);

            await test.step('Verify the page URL and title', async () => {
                await assert.pageURLContains(testData.baseURL);
                await assert.pageTitleIs('STORE');
            });
        });

        await test.step('Carrousel Navigation', async () => {
            const getItemSrc = async () => (await mainPage.getElementAttribute(mainPage.activeCarrouselItem.getByRole('img'), 'src')) ?? '';

            await test.step('Validate Carrousel and its Items are visible', async () => {
                await assert.elementIsVisible(mainPage.carrouselContainer);
                await assert.elementIsVisible(mainPage.activeCarrouselItem);
            });

            const firstItemSrc = await getItemSrc();

            await test.step('Navigate to next carrousel item and validate it has changed', async () => {
                await mainPage.clickCarrouselNext();

                const nextItemSrc = await getItemSrc();

                await assert.textIsNot(nextItemSrc, firstItemSrc);
            });

            await test.step('Navigate back to previous carrousel item and validate it has changed back to the first one', async () => {
                await mainPage.clickCarrouselPrevious();

                const previousItemSrc = await getItemSrc();

                await assert.textIs(previousItemSrc, firstItemSrc);
            });
        });

        await test.step('Category Navigation', async () => {
            let monitorFirstName: string;
            let phoneFirstName: string;
            let laptopFirstName: string;

            await test.step('Validate Categories are visible', async () => {
                await assert.elementIsVisible(mainPage.categoriesSection.catContainer);
            });

            await test.step('Filter by Monitors', async () => {
                await helpers.applyFilterAndWaitForLoad(assert, mainPage, 'monitor');

                monitorFirstName =
                    await getProductName(productNames.first());
            });

            await test.step('Filter by Laptops', async () => {
                await helpers.applyFilterAndWaitForLoad(assert, mainPage, 'laptop');

                laptopFirstName =
                    await getProductName(productNames.first());

                await test.step('Validate category is updated correctly', async () => {
                    await assert.elementIsNotVisible(productNames.filter({ hasText: monitorFirstName }));
                });
            });

            await test.step('Filter by Phones', async () => {
                await helpers.applyFilterAndWaitForLoad(assert, mainPage, 'phone');

                phoneFirstName =
                    await getProductName(productNames.first());

                await test.step('Validate category is updated correctly', async () => {
                    await assert.elementIsNotVisible(productNames.filter({ hasText: monitorFirstName }));
                    await assert.elementIsNotVisible(productNames.filter({ hasText: laptopFirstName }));
                });
            });
        });

        await test.step('Validate Pagination', async () => {
            let firstPageProducts: string[] = [];
            let secondPageProducts: string[] = [];
            let returnedPageProducts: string[] = [];

            firstPageProducts =
                await test.step('Get all product names on first page', async () => {
                    return productNames.all().then(async locators => {
                        const names: string[] = [];
                        for (const locator of locators) names.push(await getProductName(locator));
                        return names;
                    })
                });

            await test.step('Navigate to next page using pagination and await Request', async () => {
                await Promise.all([
                    mainPage.page.waitForResponse(response => response.url().includes('pagination')).then(res => res.status() === 200),
                    actions.mouse.click(mainPage.productGridSection.nextButton)
                ]);

                secondPageProducts =
                    await test.step('Get all product names on second page', async () => {
                        return productNames.all().then(async locators => {
                            const names: string[] = [];
                            for (const locator of locators) names.push(await getProductName(locator));
                            return names;
                        })
                    });

                await test.step('Assert Products displayed are not the same from previous page', async () => {
                    for (const secondName of secondPageProducts) {
                        for (const firstPageName of firstPageProducts) {
                            await assert.textIsNot(secondName, firstPageName);
                        }
                    }
                });
            });

            await test.step('Navigate to previous page using pagination and await Request', async () => {
                await Promise.all([
                    mainPage.page.waitForResponse(response => response.url().includes('pagination')).then(res => res.status() === 200),
                    actions.mouse.click(mainPage.productGridSection.previousButton)
                ]);

                returnedPageProducts =
                    await test.step('Get all product names on returned page', async () => {
                        return productNames.all().then(async locators => {
                            const names: string[] = [];
                            for (const locator of locators) names.push(await getProductName(locator));
                            return names;
                        })
                    });

                //Note: this is expected to fail. Pagination does not work correctly in this scenario.
                await test.step('Assert Products displayed are the same from previous page', async () => {
                    for (const secondName of secondPageProducts) {
                        for (const returnedPageName of returnedPageProducts) {
                            await assert.textIs(secondName, returnedPageName);
                        }
                    }
                });
            });
        });
    });
});