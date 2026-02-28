import { test } from '../fixtures/ActionsAndAssertions';
import { MainPage } from ''
test('basic test', async ({ actions, assert, }) => {
    test.step('Navigate to the homepage', async () => {
        await 
        test.step('Verify the page URL', async () => {
            await assert.pageURLContains('https://www.demoblaze.com/');
        });

        test.step('Verify the page title', async () => {
            await assert.pageTitleIs('STORE');
        });
    });
});
