import { test, expect } from '@playwright/test';
import { AddTrainingRequest } from '../../pages/Training/addTrainingRequest';
import { beforeEach, describe } from 'node:test';

test.describe('Add Training Request', () => {
    let trainingRequest: AddTrainingRequest;

    test.beforeEach(async ({ page }) => {
        trainingRequest = new AddTrainingRequest(page);
        await trainingRequest.open();
    })
    test.describe('Positive Scenario', () => {
        test('Save As Draft Training Request', async ({ page }, testInfo) => {
            const testData = {
                trainingTopic: 'Basic of Inventory',
                startDate: '1 Jan 2026',
                endDate: '31 Jan 2026',
                provider: 'DATAON',
                trainingvenue: 'DATAON',
                room: 'DATAON',
                totalCost: '1000',
                reason: 'Test Reason'
            }
            await trainingRequest.fillFormTrainingRequest(
                testData.trainingTopic,
                testData.startDate,
                testData.endDate,
                testData.provider,
                testData.trainingvenue,
                testData.room,
                testData.totalCost,
                testData.reason
            );
            await trainingRequest.clickSaveAsDraft();

            //validation
            await trainingRequest.changeToTable(testData.trainingTopic);
            const row = trainingRequest.validation;
            await expect(row).toBeVisible();
            await expect(row).toContainText(testData.trainingTopic);
            await expect(row).toContainText('E-Learning');
            await expect(row).toContainText('Draft');
            await expect(row).toContainText('External Provider');

            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        });
        test('Send To Approve Training Request', async ({ page }, testInfo) => {
            const testData = {
                trainingTopic: 'Training Developer',
                startDate: '1 Jan 2026',
                endDate: '31 Jan 2026',
                provider: 'DATAON',
                trainingvenue: 'DATAON',
                room: 'DATAON',
                totalCost: '1000',
                reason: 'Test Reason'
            }
            await trainingRequest.fillFormTrainingRequest(
                testData.trainingTopic,
                testData.startDate,
                testData.endDate,
                testData.provider,
                testData.trainingvenue,
                testData.room,
                testData.totalCost,
                testData.reason
            );
            await trainingRequest.clickSendToApprove();

            //validation
            await trainingRequest.changeToTable(testData.trainingTopic);
            const row = trainingRequest.validation;
            await expect(row).toBeVisible();
            await expect(row).toContainText(testData.trainingTopic);
            await expect(row).toContainText('E-Learning');
            await expect(row).toContainText('Fully Approved');
            await expect(row).toContainText('New Training');

            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        });
    });
    test.describe('Negative Scenario', () => {
        test('Empty Data Save As Draft', async ({ page }, testInfo) => {
            await trainingRequest.clickAdd();
            await trainingRequest.buttonSaveAsDraft.click();

            //validation
            const expectedErrors = [
                'Preferable event type is required',
                'Training topic is required',
                'Date is required',
                'Employee is required'

            ];
            for (const errorMsg of expectedErrors) {
                await expect(page.getByText(errorMsg).first()).toBeVisible();
            }

            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        });
        test('Empty Data Send To Approve', async ({ page }, testInfo) => {
            await trainingRequest.clickAdd();
            await trainingRequest.buttonSendToApprove.click();

            //validation
            const expectedErrors = [
                'Preferable event type is required',
                'Training topic is required',
                'Date is required',
                'Employee is required'

            ];
            for (const errorMsg of expectedErrors) {
                await expect(page.getByText(errorMsg).first()).toBeVisible();
            }

            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        });
    });
});