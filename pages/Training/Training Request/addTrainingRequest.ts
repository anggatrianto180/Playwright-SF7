import { Page, expect } from '@playwright/test';

export class AddTrainingRequest {
    private page: Page;

    //Locators
    buttonAddTrainingRequest;
    evenType;
    trainingTopic;
    startDate;
    endDate;
    selectEmployee;
    buttonTransfer;
    provider;
    trainingVenue;
    room;
    totalCost;
    reason;
    buttonSaveAsDraft;
    buttonSendToApprove;
    buttonConfirmation;
    validation;

    constructor(page: Page) {
        this.page = page;

        this.buttonAddTrainingRequest = page.getByRole('button', { name: 'Add Training Request' });
        this.evenType = page.locator('div.ant-select-selection-overflow');
        this.trainingTopic = page.getByRole('textbox', { name: 'Training Topic' });
        this.startDate = page.getByPlaceholder('Start date');
        this.endDate = page.getByPlaceholder('End date');
        this.selectEmployee = page.locator('.ant-transfer-list-content-item').nth(2);
        this.buttonTransfer = page.locator('div.ant-transfer-operation').locator('button').nth(0)
        this.provider = page.getByRole('textbox', { name: 'Provider' });
        this.trainingVenue = page.getByRole('textbox', { name: 'Training Venue' });
        this.room = page.getByRole('textbox', { name: 'Room' });
        this.totalCost = page.getByPlaceholder('0.00');
        this.reason = page.getByRole('textbox', { name: 'Reason for Request' });
        //Button
        this.buttonSaveAsDraft = page.getByText('Save as Draft', { exact: true });
        this.buttonSendToApprove = page.locator('span:has-text("Send To Approver")');
        this.buttonConfirmation = page.getByRole('button', { name: 'OK' });
        //validation
        this.validation = page.locator('.ant-table-row').first();
    }

    async open() {
        await this.page.goto('ent/hrm.training.training-request');
    }

    async clickAdd() {
        await this.buttonAddTrainingRequest.click();
    }

    async selectEventType() {
        await this.evenType.click();
        await this.evenType.press('Enter');
    }

    async fillTrainingTopic(trainingTopic: string) {
        await this.trainingTopic.fill(trainingTopic);
    }

    async fillDate(startDate: string, endDate: string) {
        await this.startDate.click();
        await this.startDate.fill(startDate);
        await this.page.waitForTimeout(500);
        await this.startDate.press('Tab');
        await this.page.waitForTimeout(500);
        await this.endDate.click();
        await this.endDate.fill(endDate);
        await this.page.waitForTimeout(500);
        await this.endDate.press('Tab');
    }

    async fillSelectEmployee() {
        await this.selectEmployee.click();
        await this.buttonTransfer.click();
    }

    async fillProvider(provider: string) {
        await this.provider.fill(provider);
    }

    async fillTrainingvenue(trainingvenue: string) {
        await this.trainingVenue.fill(trainingvenue);
    }

    async fillRoom(room: string) {
        await this.room.fill(room);
    }

    async fillTotalCost(totalCost: string) {
        await this.totalCost.fill(totalCost);
    }

    async fillReason(reason: string) {
        await this.reason.fill(reason);
    }

    async fillFormTrainingRequest(
        trainingTopic: string,
        startDate: string,
        endDate: string,
        provider: string,
        trainingvenue: string,
        room: string,
        totalCost: string,
        reason: string) {
        await this.clickAdd();
        await this.selectEventType();
        await this.fillTrainingTopic(trainingTopic);
        await this.fillDate(startDate, endDate);
        await this.fillSelectEmployee();
        await this.fillProvider(provider);
        await this.fillTrainingvenue(trainingvenue);
        await this.fillRoom(room);
        await this.fillTotalCost(totalCost);
        await this.fillReason(reason);
    }

    async clickSaveAsDraft() {
        await this.buttonSaveAsDraft.click();
        await this.buttonConfirmation.click();
    }

    async clickSendToApprove() {
        await this.buttonSendToApprove.click();
        await this.buttonConfirmation.click();
    }

    async changeToTable(trainingName: string) {
        await this.page.locator("label[class='ant-radio-button-wrapper']").click();
        await this.page.getByRole('textbox', { name: 'Training Name' }).fill(trainingName);
        await this.page.getByRole('textbox', { name: 'Training Name' }).press('Enter');
    }
}
