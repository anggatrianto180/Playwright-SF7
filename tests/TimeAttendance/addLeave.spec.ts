import { test, expect } from '@playwright/test';
import { LeaveRequestPage } from '../../pages/TimeAttendance/addleave-page';
import { faker } from '@faker-js/faker';

test.describe('Add Leave Scenarios', () => {
  let leave: LeaveRequestPage;

  test.beforeEach(async ({ page }) => {
    leave = new LeaveRequestPage(page);
    await leave.open();
  })

  test.describe('Positive Scenarios', () => {
    test('Add Leave - Save as Draft', async ({ page }, testInfo) => {
      const testData = {
        date: '17 Dec 2025',
        leaveType: 'Annual Leave',
        randomRemark: faker.lorem.sentence()
      }

      await leave.clickAdd();
      await leave.fillLeaveForm(testData.date, testData.randomRemark, null, testData.leaveType);
      await page.waitForTimeout(2000);
      await leave.saveAsDraft();

      //validation
      const row = leave.Validation;
      await expect(row).toBeVisible();
      await expect(row).toContainText('Draft');
      await expect(row).toContainText('Gordon Enns');
      await expect(row).toContainText(testData.randomRemark);
      await expect(row).toContainText(testData.leaveType);
      await expect(row).toContainText(testData.date);

      // SCREENSHOT SUKSES (Nama File Dinamis)
      // Membersihkan nama test dari spasi agar jadi nama file yang valid
      const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
      await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
    })

    test('Add Leave - Send to approve', async ({ page }, testInfo) => {
      const testData = {
        date: '18 Dec 2025',
        leaveType: 'Annual Leave',
        randomRemark: faker.lorem.sentence()
      }
      await leave.clickAdd();
      await leave.fillLeaveForm(testData.date, testData.randomRemark, null, testData.leaveType);
      await page.waitForTimeout(2000);
      await leave.sendToApprover();

      //validation
      const row = leave.Validation;
      await expect(row).toBeVisible();
      await expect(row).toContainText('Gordon Enns');
      await expect(row).toContainText(testData.randomRemark);
      await expect(row).toContainText(testData.leaveType);
      await expect(row).toContainText(testData.date);
      await expect(row).toContainText('Fully Approved');

      const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
      await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
    })

    test('Add Leave - For Another Employee', async ({ page }, testInfo) => {
      const testData = {
        date: '16 Dec 2025',
        leaveType: 'Annual Leave',
        randomRemark: faker.lorem.sentence()
      }

      await leave.clickAdd();
      await leave.selectRequestFor('Aashka Valencia');
      await leave.fillLeaveForm(testData.date, testData.randomRemark, null, testData.leaveType);
      await page.waitForTimeout(2000);
      await leave.saveAsDraft();

      //validation
      const row = leave.Validation;
      await expect(row).toBeVisible();
      await expect(row).toContainText('Draft');
      await expect(row).toContainText('Aashka Valencia');
      await expect(row).toContainText(testData.randomRemark);
      await expect(row).toContainText(testData.leaveType);
      await expect(row).toContainText(testData.date);

      const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
      await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
    })
  })

  test.describe('Negative Scenarios @negative', () => {
    test('Add Leave - Empty Type Of Leave', async ({ page }, testInfo) => {
      const testData = {
        date: '17 Dec 2025',
        leaveType: null,
        randomRemark: faker.lorem.sentence()
      }

      await leave.clickAdd();
      await leave.fillLeaveForm(testData.date, testData.randomRemark, null, testData.leaveType);
      await page.waitForTimeout(2000);
      await leave.sendToApproveNegative();

      //validation
      await expect(page.getByText('Please Select Type Of Leave', { exact: true })).toContainText('Please Select Type Of Leave');

      // SCREENSHOT SUKSES (Nama File Dinamis)
      // Membersihkan nama test dari spasi agar jadi nama file yang valid
      const screenshotName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
      await page.screenshot({ path: `Screenshoot/${screenshotName}.png`, fullPage: true });
    })

    test('Add Leave - 0 Day', async ({ page }) => {

    })


  })
})

