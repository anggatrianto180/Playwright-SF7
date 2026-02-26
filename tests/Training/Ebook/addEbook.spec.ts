import { test, expect } from '@playwright/test';
import { AddEbook } from '../../../pages/Training/Ebook/addEbook';
import path from 'path';

test.describe('Add Ebook', () => {
    let training: AddEbook;

    test.beforeEach(async ({ page }) => {
        training = new AddEbook(page);
        await training.open();
    })

    test.describe('Positive Scenarios', () => {
        test('Add Ebook', async ({ page }, testInfo) => {
            const fileToUpload = path.resolve(__dirname, '../fixtures/paine-common-sense.epub');
            await training.uploadDocument(fileToUpload);

            const testData = {
                bookTitle: 'Sunfish Book 7',
                description: 'This is Sunfish Book',
                tags: 'Sunfish',
            }
            await training.fillAddEbook(
                testData.bookTitle,
                testData.description,
                testData.tags
            );

            await training.clickButtonSubmit();
            await training.clickConfirmationSubmit();

            await training.changeTotable(testData.bookTitle)
            const row = training.Validation;
            await expect(row).toBeVisible();
            await expect(row).toContainText(testData.bookTitle);
            await expect(row).toContainText('Thomas Paine');
            await expect(row).toContainText('Basic');

            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        })
    })

    test.describe('Negative Scenarios', () => {
        test('Add Ebbok with empty all fields', async ({ page }, testInfo) => {
            await training.clickAdd();
            await training.clickButtonSubmit();

            const expectedErrors = [
                'eBook file is required',
                'Book title is required',
                'Author is required',
                'Level is required',
                'Category is required'
            ];

            for (const errorMsg of expectedErrors) {
                await expect(page.getByText(errorMsg).first()).toBeVisible();
            }

            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        })
    })
})
