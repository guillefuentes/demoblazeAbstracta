import { test } from '../fixtures/pageManager';
import * as writeJSONfile from 'fs';
import * as helper from '@helpers/productHelpers';
import ProductInformation from '@interface/ProductInformation';

const baseURL = 'https://www.demoblaze.com/';
const currentDate = new Date().toISOString().split('T')[0];
const outputFilePath = `./output/ProductDetails_${currentDate}.json`;

test.describe(`Demoblaze Store - Mandatory Test #1`, { tag: ['@BLZ_001'] }, () => {
    test('get Data From Product List', async ({ actions, assert, mainPage }, testInfo) => {
        await test.step('Navigate to homepage', async () => {
            await mainPage.navigateTo(baseURL);

            await test.step('Verify the page URL and title', async () => {
                await assert.pageURLContains(baseURL);
                await assert.pageTitleIs('STORE');
            });
        });

        await test.step('Validate Product Grid pressence and product card elements', async () => {
            await test.step('Verify product grid is visible', async () => {
                await assert.elementIsVisible(mainPage.productGridSection.gridContainer);
            });
            await test.step('Verify at least one product card is visible', async () => {
                await assert.elementIsVisible(mainPage.productGridSection.productCard.container.first());
            });
            await test.step('Verify at least one product card shows correct information', async () => {
                await assert.elementIsVisible(mainPage.productGridSection.productCard.productName.first());
                await assert.elementIsVisible(mainPage.productGridSection.productCard.productPrice.first());
                await assert.elementIsVisible(mainPage.productGridSection.productCard.productDescription.first());
            });
        });

        const productList: ProductInformation[] = [];

        await test.step(`Extract product information from all products in list (Page #1)`, async () => {
            await helper.extractProductInformation(mainPage, productList);
        });

        await test.step(`Click on "Next" Pagination Button at the bottom`, async () => {
            await actions.mouse.click(mainPage.productGridSection.nextButton);

            await test.step(`Verify the page has loaded the next set of products`, async () => {
                const response =
                    await test.step(`Wait for API Response Status`, async () => {
                        return await mainPage.page.waitForResponse(response => response.url().includes('pagination'));
                    });

                await test.step(`verify Response Status Code is OK`, async () => {
                    await assert.responseStatusIsOK(response);
                });

                await test.step(`verify Product Card List shows at least one product`, async () => {
                    await assert.elementIsVisible(mainPage.productGridSection.productCard.container.first());
                });
            });
        });

        await test.step(`Extract product information from all products in list (Page #2)`, async () => {
            await helper.extractProductInformation(mainPage, productList);
        });

        await test.step(`Generate JSON file with Product List Details`, async () => {
            await test.step(`Create "output" directory, if needed`, async () => {
                writeJSONfile.mkdirSync('./output', { recursive: true });
            });
            await test.step(`Write product information to JSON file`, async () => {
                writeJSONfile.writeFileSync(outputFilePath, JSON.stringify(productList, null, 2));
            });

            await test.step(`Attach product information file to test report`, async () => {
                await testInfo.attach('ProductDetails', {
                    path: outputFilePath,
                    contentType: 'application/json'
                });
            });
        });
    });
});