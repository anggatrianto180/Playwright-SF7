import { test, expect } from '@playwright/test';
import { AddTrainingRoadmap } from '../../pages/Training/addTrainingRoadmap';

test.describe('Add Roadmap training', () => {
    let training: AddTrainingRoadmap;

    test.beforeEach(async ({ page }) => {
        training = new AddTrainingRoadmap(page);
        await training.open();
    });

    test.describe('Positive Scenario', () => {
        test('Add Roadmap training', async ({ page }, testInfo) => {
            const testData = {
                roadmapCode: 'Implementation',
                roadmapName: 'RoadMap Implementation',
                parent: 'marketing full',
                date: '31 Jan 2026'
            }
            await training.fillForm(
                testData.roadmapCode,
                testData.roadmapName,
                testData.parent,
                testData.date
            );
            await training.submitForm();

            await training.validationSearch(testData.roadmapName);
            const row = training.validation;
            await expect(row).toBeVisible();
            await expect(row).toContainText(testData.roadmapName);
            await expect(row).toContainText(testData.date);

            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        })
    })
})