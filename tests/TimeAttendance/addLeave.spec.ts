import { test, expect } from '@playwright/test';
import { LeaveRequestPage } from '../../pages/TimeAttendance/addleave-page';
import { faker } from '@faker-js/faker';

test.describe('Add Leave', () => {
  test('Add Leave - Save as Draft', async ({ page }, testInfo) => {
      const leave = new LeaveRequestPage(page);
      const randomRemark = faker.lorem.sentence();

      await leave.open();
      await leave.clickAdd();
      await leave.fillLeaveForm('18 Dec 2025', randomRemark, null, 'Annual Leave');
      await page.waitForTimeout(2000);
      await leave.saveAsDraft();

      //validation
      const row = await leave.Validation;
          await expect(row).toBeVisible();
            await expect(row).toContainText('Draft');
            await expect(row).toContainText('Gordon Enns'); 
            await expect(row).toContainText(randomRemark);
            await expect(row).toContainText('Annual Leave');
            await expect(row).toContainText('18 Dec 2025');

      // SCREENSHOT SUKSES (Nama File Dinamis)
      // Membersihkan nama test dari spasi agar jadi nama file yang valid
      const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
      await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
  })

  test('Add Leave - Send to approve', async ({ page }, testInfo) => {
      const leave = new LeaveRequestPage(page);

      await leave.open();
      await leave.clickAdd();
      await leave.fillLeaveForm('19 Dec 2025', 'Family Event', null, 'Annual Leave');
      await page.waitForTimeout(2000);
      await leave.sendToApprover();

        //validation
      const row = await leave.Validation;
          await expect(row).toBeVisible();
            await expect(row).toContainText('Gordon Enns'); 
            await expect(row).toContainText('Family Event');
            await expect(row).toContainText('Annual Leave');
            await expect(row).toContainText('19 Dec 2025');
            await expect(row).toContainText('Fully approved');

      // SCREENSHOT SUKSES (Nama File Dinamis)
      // Membersihkan nama test dari spasi agar jadi nama file yang valid
      const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
      await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
  })
  
  test('Add Leave - For Another Employee', async ({ page }, testInfo) => {
      const leave = new LeaveRequestPage(page);
      const randomRemark = faker.lorem.sentence();

      await leave.open();
      await leave.clickAdd();
      await leave.selectRequestFor('Aashka Valencia');
      await leave.fillLeaveForm('30 Dec 2025', randomRemark, null, 'Annual Leave');
      await page.waitForTimeout(2000);
      await leave.saveAsDraft();

        //validation
      const row = await leave.Validation;
          await expect(row).toBeVisible();
            await expect(row).toContainText('Draft');
            await expect(row).toContainText('Aashka Valencia'); 
            await expect(row).toContainText(randomRemark);
            await expect(row).toContainText('Annual Leave');
            await expect(row).toContainText('30 Dec 2025');

      const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
      await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
  })
  
})

