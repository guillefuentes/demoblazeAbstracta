import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages';
import CheckoutUserInformation from '@interface/CheckoutUserInformation';
export default class PlaceOrderModal extends BasePage {
    modalIdentifier: Locator;

    topCloseButton: Locator;
    orderFields: {
        name: Locator;
        country: Locator;
        city: Locator;
        creditCard: Locator;
        month: Locator;
        year: Locator;
    };
    purchaseButton: Locator;
    bottomCloseButton: Locator;

    successMessage: Locator;
    successMessageOKButton: Locator;
    successMessageDetails: Locator;

    private placeOrderLocators = {
        modalIdentifier: this.page.locator('.modal-content').filter({ hasText: 'Place order' }),
        topCloseButton: this.page.getByRole('button', { name: 'Close' }).first(),
        name: this.page.locator('#name'),
        country: this.page.locator('#country'),
        city: this.page.locator('#city'),
        creditCard: this.page.locator('#card'),
        month: this.page.locator('#month'),
        year: this.page.locator('#year'),
        purchaseButton: this.page.getByRole('button', { name: 'Purchase' }),
        bottomCloseButton: this.page.getByRole('button', { name: 'Close' }),
        successMessage: this.page.locator('.sweet-alert'),
        successMessageOKButton: this.page.getByRole('button', { name: 'OK' }),
        successMessageDetails: this.page.locator('.sweet-alert .lead'),
    };

    constructor(page: Page) {
        super(page);

        this.modalIdentifier = this.placeOrderLocators.modalIdentifier;
        this.topCloseButton = this.placeOrderLocators.topCloseButton;
        this.orderFields = {
            name: this.placeOrderLocators.name,
            country: this.placeOrderLocators.country,
            city: this.placeOrderLocators.city,
            creditCard: this.placeOrderLocators.creditCard,
            month: this.placeOrderLocators.month,
            year: this.placeOrderLocators.year,
        };
        this.purchaseButton = this.placeOrderLocators.purchaseButton;
        this.bottomCloseButton = this.placeOrderLocators.bottomCloseButton;
        this.successMessage = this.placeOrderLocators.successMessage;
        this.successMessageOKButton = this.placeOrderLocators.successMessageOKButton;
        this.successMessageDetails = this.placeOrderLocators.successMessageDetails;
    };

    async fillOrderForm(orderDetails: CheckoutUserInformation): Promise<void> {
        await this.orderFields.name.fill(orderDetails.name);
        await this.orderFields.country.fill(orderDetails.country);
        await this.orderFields.city.fill(orderDetails.city);
        await this.orderFields.creditCard.fill(orderDetails.creditCard);
        await this.orderFields.month.fill(orderDetails.month);
        await this.orderFields.year.fill(orderDetails.year);
    };

    async clickPurchaseInModal(): Promise<void> {
        await this.purchaseButton.click();
    };

    async clickCloseModalBottom(): Promise<void> {
        await this.bottomCloseButton.click();
    };

    async clickCloseModalTop(): Promise<void> {
        await this.topCloseButton.click();
    };

    async getSuccessMessageDetails(): Promise<string | null> {
        return await this.successMessageDetails.innerText();
    };

    async clickSuccessMessageOK(): Promise<void> {
        await this.successMessageOKButton.click();
    }
};