import { test, expect, Page } from '@playwright/test';
import { OvertimePage } from '../../pages/TimeAttendance/overtime-page';

test.describe('Overtime Request', () => {
    test('Overtime Request - Save as Draft', async ({ page }) => {
        const overtime = new OvertimePage(page);

        await overtime.open();
        await overtime.fillFormOvertime('Remark', '19 Nov', '10:00', '12:00')
        await overtime.saveAsDraft();
    })
    test('Overtime Request - Send To APprove', async ({ page }) => {
        const overtime = new OvertimePage(page);

        await overtime.open();
        await overtime.fillFormOvertime('Remark', '19 Nov', '10:00', '12:00')
        await overtime.saveAsDraft();
    })
    
})