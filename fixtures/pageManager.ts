import { test as base } from '@fixtures/ActionsAndAssertions';
import { MainPage } from '@pages';
import { LogInModal, SignUpModal } from '@modals';

interface PageManager {
    mainPage: MainPage;
    //CartPage: CartPage;
    //
};

export const test = base.extend<PageManager>({
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
});