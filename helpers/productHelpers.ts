import { test } from '@playwright/test';
import { MainPage } from '@pages';
import ProductInformation from '@interface/ProductInformation';

const baseURL = process.env.BASE_URL || 'https://www.demoblaze.com/';

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
                    productLink: baseURL + productLink,
                    productDescription: productDescription
                });
            });
        });
    };

    return productList;
}