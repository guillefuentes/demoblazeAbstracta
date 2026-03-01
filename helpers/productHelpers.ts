import { test } from '@playwright/test';
import { MainPage } from '@pages';
import ProductInformation from '@interface/ProductInformation';
import Assert from '@helpers/assert/Assertions';
import * as testData from '@test-data/testData';


export async function extractProductInformation(mainPage: MainPage, productList: ProductInformation[]): Promise<ProductInformation[]> {
    //Simplified locators for Card elements
    const pCards = await mainPage.productGridSection.productCard.container.all();
    const pCardTitle = mainPage.productGridSection.productCard.productName;
    const pCardPrice = mainPage.productGridSection.productCard.productPrice;
    const pCardLink = mainPage.productGridSection.productCard.productLink;
    const pCardDesc = mainPage.productGridSection.productCard.productDescription;

    for (let index = 0; index < pCards.length; index++) {
        await test.step(`Store products ${index + 1} information`, async () => {
            const productName = await mainPage.getTextFromElement(pCards[index].locator(pCardTitle));
            const productPrice = await mainPage.getTextFromElement(pCards[index].locator(pCardPrice));
            const productLink = await mainPage.getElementAttribute(pCards[index].locator(pCardLink), 'href');
            const productDescription = await mainPage.getTextFromElement(pCards[index].locator(pCardDesc));

            await test.step(`Push products ${index + 1} information into an array`, async () => {
                productList.push({
                    productTitle: productName,
                    productPrice: Number(productPrice.replace('$', '')),
                    productLink: testData.baseURL + productLink,
                    productDescription: productDescription
                });
            });
        });
    };

    return productList;
}

export async function applyFilterAndWaitForLoad(assert: Assert, mainPage: MainPage, category: 'phone' | 'laptop' | 'monitor') {
    await test.step(`Filter by Category: ${category}`, async () => {
        await mainPage.clickCategory(category);

            await test.step(`Verify the page has loaded products by category`, async () => {
                const response =
                    await test.step(`Wait for API Response Status`, async () => {
                        return await mainPage.page.waitForResponse(response => response.url().includes('bycat'));
                    });

            await test.step(`verify Response Status Code is OK`, async () => {
                await assert.responseStatusIsOK(response);
            });

            await test.step(`verify Product Card List shows at least one product`, async () => {
                await assert.elementIsVisible(mainPage.productGridSection.productCard.container.first());
            });
        });
    });
}