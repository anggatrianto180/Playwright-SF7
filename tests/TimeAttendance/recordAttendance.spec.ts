import { test } from '@playwright/test';
import { AttendancePage } from '../../pages/TimeAttendance/attendance-page';

test.describe('Attendance Feature', () => {

  test('should successfully record attendance time', async ({ page }) => {
    const attendance = new AttendancePage(page);

    await test.step('Open attendance page', async () => {
      await attendance.open();
    });

    await test.step('Record time and verify success', async () => {
      await attendance.recordTime();
      await attendance.verifyRecordSuccess();
    });
  });
});
