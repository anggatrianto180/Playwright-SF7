import { test, expect } from '@playwright/test';
import { TrainingCalendar } from '../../pages/Training/trainingCalendar';

test.describe('Training Calendar', () => {
    let training: TrainingCalendar;


    test.beforeEach(async ({ page }) => {
        training = new TrainingCalendar(page);
        await training.open();
    })

    test('Training Calendar', async ({ page }, testInfo) => {
        await training.verifyname();

        const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
        await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
    })
})