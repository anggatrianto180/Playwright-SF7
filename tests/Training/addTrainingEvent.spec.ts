import { test, expect } from '@playwright/test';
import { AddTrainingEvent } from '../../pages/Training/addTrainingEvent';

test.describe('Add Training Event', () => {
    let training: AddTrainingEvent;

    test.beforeEach(async ({ page }) => {
        training = new AddTrainingEvent(page);
        await training.open();
    })
    test.describe('Positive Scenarios', () => {
        test('Save As Draft Training Event', async ({ page }, testInfo) => {
            const testData = {
                trainingCourse: 'Basic of Inventory',
                trainingName: 'Training Developer',
                provider: 'DATAON',
                startDate: '1 Jan 2026',
                endDate: '31 Jan 2026',
                background: 'Test Background',
                objective: 'Test Objective',
                targetParticipant: 'Test Target Participant',
                remark: 'Test Remark',
                participant: '10',
                trainingCapacity: '10',
                contentName: 'Marketing',
                agendaDate: '20 Jan 2026',
                agendaTitle: 'Test Agenda',
                agendaStartTime: '08:00',
                agendaEndTime: '09:00'
            }

            await training.clickAdd();
            await training.fillFormGenerakInfo(
                testData.trainingCourse,
                testData.trainingName,
                testData.provider,
                testData.startDate,
                testData.endDate
            );
            await training.fillFormEventDetail(
                testData.background,
                testData.objective,
                testData.targetParticipant,
                testData.remark,
                testData.participant
            );

            await training.fillAgenda(
                testData.agendaDate,
                testData.agendaTitle,
                testData.agendaStartTime,
                testData.agendaEndTime
            );

            await training.fillFormParticipant(
                testData.trainingCapacity
            );
            await training.fillFormElearning(testData.contentName);
            await training.clickSaveAsDraft();

            //Validation
            await training.changeToTable('Training Developer');
            const row = training.validation;
            await expect(row).toBeVisible();
            await expect(row).toContainText(testData.trainingName);
            await expect(row).toContainText(testData.trainingCourse);
            await expect(row).toContainText(testData.provider);
            await expect(row).toContainText('Internal Provider');
            await expect(row).toContainText(testData.startDate);
            await expect(row).toContainText(testData.endDate);


            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        })
        test('Publish Training Event', async ({ page }, testInfo) => {
            const testData = {
                trainingCourse: 'Basic of Inventory',
                trainingName: 'Training Developer',
                provider: 'DATAON',
                startDate: '1 Jan 2026',
                endDate: '31 Jan 2026',
                background: 'Test Background',
                objective: 'Test Objective',
                targetParticipant: 'Test Target Participant',
                remark: 'Test Remark',
                participant: '10',
                trainingCapacity: '10',
                contentName: 'Marketing',
                agendaDate: '21 Jan 2026',
                agendaTitle: 'Test Agenda',
                agendaStartTime: '08:00',
                agendaEndTime: '09:00'
            }

            await training.clickAdd();
            await training.fillFormGenerakInfo(
                testData.trainingCourse,
                testData.trainingName,
                testData.provider,
                testData.startDate,
                testData.endDate
            );
            await training.fillFormEventDetail(
                testData.background,
                testData.objective,
                testData.targetParticipant,
                testData.remark,
                testData.participant
            );

            await training.fillAgenda(
                testData.agendaDate,
                testData.agendaTitle,
                testData.agendaStartTime,
                testData.agendaEndTime
            );
            await training.fillFormParticipant(
                testData.trainingCapacity
            );
            await training.fillFormElearning(testData.contentName);
            await training.clickPublish();

            //Validation
            await training.changeToTable('Training Developer');
            const row = training.validation;
            await expect(row).toBeVisible();
            await expect(row).toContainText(testData.trainingName);
            await expect(row).toContainText(testData.trainingCourse);
            await expect(row).toContainText(testData.provider);
            await expect(row).toContainText('Internal Provider');
            await expect(row).toContainText(testData.startDate);
            await expect(row).toContainText(testData.endDate);


            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        })
        test('Unpublish Training Event', async ({ page }, testInfo) => {
            const testData = {
                trainingCourse: 'Basic of Inventory',
                trainingName: 'Training Developer',
                provider: 'DATAON',
                startDate: '1 Jan 2026',
                endDate: '31 Jan 2026',
                background: 'Test Background',
                objective: 'Test Objective',
                targetParticipant: 'Test Target Participant',
                remark: 'Test Remark',
                participant: '10',
                trainingCapacity: '10',
                contentName: 'Marketing',
                agendaDate: '22 Jan 2026',
                agendaTitle: 'Test Agenda',
                agendaStartTime: '08:00',
                agendaEndTime: '09:00'
            }

            await training.clickAdd();
            await training.fillFormGenerakInfo(
                testData.trainingCourse,
                testData.trainingName,
                testData.provider,
                testData.startDate,
                testData.endDate
            );
            await training.fillFormEventDetail(
                testData.background,
                testData.objective,
                testData.targetParticipant,
                testData.remark,
                testData.participant
            );

            await training.fillAgenda(
                testData.agendaDate,
                testData.agendaTitle,
                testData.agendaStartTime,
                testData.agendaEndTime
            );
            await training.fillFormParticipant(
                testData.trainingCapacity
            );
            await training.fillFormElearning(testData.contentName);
            await training.clickUnpublish();

            //Validation
            await training.changeToTable('Training Developer');
            const row = training.validation;
            await expect(row).toBeVisible();
            await expect(row).toContainText(testData.trainingName);
            await expect(row).toContainText(testData.trainingCourse);
            await expect(row).toContainText(testData.provider);
            await expect(row).toContainText('Internal Provider');
            await expect(row).toContainText(testData.startDate);
            await expect(row).toContainText(testData.endDate);


            const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
            await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
        })
    })
})