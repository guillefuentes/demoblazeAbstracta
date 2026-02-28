import { test as base } from '@playwright/test'
import Assertions from '../helpers/assert/Assertions';
import AllActions from '../helpers/actions/AllActions';

type AssertFixture = {
    assert: Assertions;
};

type ActionsFixture = {
    actions: {
        mouse: AllActions['mouse'];
        keyboard: AllActions['keyboard'];
        browser: AllActions['browser'];
    };
};

export const test = base.extend<AssertFixture & ActionsFixture>({
    assert: async ({ page }, use) => {
        await use(new Assertions(page));
    },
    actions: async ({ page }, use) => {
        const allActions = new AllActions(page);
        await use({
            mouse: allActions.mouse,
            keyboard: allActions.keyboard,
            browser: allActions.browser,
        });
    }
});