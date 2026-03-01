import { test as base } from '@fixtures/ActionsAndAssertions';
import { MainPage, CartPage, ProductPage } from '@pages';

interface PageManager {
    mainPage: MainPage;
    productPage: ProductPage;
    cartPage: CartPage;
};

export const test = base.extend<PageManager>({
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    }
});