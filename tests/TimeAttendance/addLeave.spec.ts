import { test, expect } from '@playwright/test';
import { LeaveRequestPage } from '../../pages/TimeAttendance/addleave-page';

test.describe('Add Leave', () => {
  test('Add Leave - Save as Draft', async ({ page }) => {
      const leave = new LeaveRequestPage(page);

      await leave.open();
      await leave.clickAdd();
      await leave.fillLeaveForm('8 Dec 2025', 'Family Event', null, 'Annual Leave');
      await leave.saveAsDraft();
  })

  test('Add Leave - Send to approve', async ({ page }) => {
      const leave = new LeaveRequestPage(page);

      await leave.open();
      await leave.clickAdd();
      await leave.fillLeaveForm('9 Dec 2025', 'Family Event', null, 'Annual Leave');
      await leave.sendToApprover();
  })
  
  test('Add Leave - For Another Employee', async ({ page }) => {
      const leave = new LeaveRequestPage(page);

      await leave.open();
      await leave.clickAdd();
      await leave.selectRequestFor('Aashka Valencia');
      await leave.fillLeaveForm('10 Dec 2025', 'Family Event', null, 'Annual Leave');
      await leave.saveAsDraft();
  })
  
})

