import { test, expect } from '@playwright/test';
import { AddTrainingCourse } from '../../pages/Training/addTrainingCourse-page';

test.describe('Add Training Course', () => {
    let training: AddTrainingCourse;

    test.beforeEach(async ({ page }) => {
        training = new AddTrainingCourse(page);
        await training.open();
    })

    test.describe('Positive Scenarios', () => {
        test('Add Training Course', async ({ page }, testInfo) => {
            const testData = {
                courseCode: 'TC001',
                courseName: 'Training Course Periode 7',
                trainingCategory: 'Accounting and Finance',
                trainingType: 'Coaching',
                courseDescription: 'Test Description',
                background: 'Test Background',
                objective: 'Test Objective',
                provider: 'ALISON',
                listProvider: 'ALISON',
                jobTitle: 'J007',
                estimateCost: '1000',
                code: 'TC001'
            }

            await training.clickAdd();
            await training.clickCreateNewCourse();
            await training.fillTrainingCourse(testData.courseCode, testData.courseName, testData.trainingCategory, testData.trainingType, testData.courseDescription, testData.background, testData.objective, testData.provider, testData.listProvider, testData.jobTitle, testData.estimateCost);
            await training.clickSubmit();
            await training.clickbBttonConfirmation();

            //Validation
            await training.changeToTable(testData.courseCode);
            const row = training.Validation;
            await expect(row).toBeVisible();
            await expect(row).toContainText(testData.courseName);
            await expect(row).toContainText(testData.trainingType);
            await expect(row).toContainText(testData.courseDescription);
            await expect(row).toContainText('1,000.00');

            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        })
    })
    test.describe('Negative Scenarios', () => {
        test('Add Training Course - Empty Form Required', async ({ page }, testInfo) => {

            await training.clickAdd();
            await training.clickCreateNewCourse();
            await training.clickSubmit();

            //Validation
            const expectedErrors = [
                'Course code is required',
                'Course Name is required',
                'Course level is required',
                'Training category is required',
                'Training Type is required',
                'Course desc is required',
                'Provider is required'
            ];

            for (const errorMsg of expectedErrors) {
                await expect(page.getByText(errorMsg).first()).toBeVisible();
            }

            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        })
    })


})