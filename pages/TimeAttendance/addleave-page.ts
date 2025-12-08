// tests/leave/leaveRequest.page.ts
import { Page, expect } from '@playwright/test';

export class LeaveRequestPage {
  private page: Page;

  // === Locators ===
  addButton;
  remarkInput;
  typeOfLeaveDropdown;
  dateInput;
  draftButton;
  sendToApproverButton;
  Validation;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators (constructor best practice)
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.remarkInput = page.getByLabel('Remark');
    this.typeOfLeaveDropdown = page.getByLabel('Type Of Leave');
    this.dateInput = page.getByPlaceholder('Leave Start Date');
    this.draftButton = page.getByRole('button', { name: 'Draft' });
    this.sendToApproverButton = page.getByRole('button', { name: 'Send To Approver' });

    //validation
    this.Validation = page.locator('.ant-table-row').first();
  }

  // === Dynamic Locators ===
  employeeSelector = (name: string) =>
    this.page.locator(`//span[@title='${name}']`);

  employeeOption = (name: string) =>
    this.page.getByText(name);

  // === Page Actions ===
  async open() {
    await this.page.goto(
      'standard/hrm.time-and-attendance.attendance-request.leave-request'
    );
  }

  async clickAdd() {
    await this.addButton.click();
  }

  async selectRequestFor(employeeName: string | null) {
    if (!employeeName) return;

    // Click dropdown list
    await this.employeeSelector('Gordon Enns (ID00020001)').click();

    // Select actual employee
    await this.employeeOption(employeeName).click();
  }

  async selectLeaveType(optionAnnualLeave: string) {
    await this.typeOfLeaveDropdown.click();
    await this.page.getByText(optionAnnualLeave).click();
  }

  async setDate(date: string) {
    await this.page.waitForTimeout(2000);
    await this.dateInput.click({ clickCount: 3 });
    await this.dateInput.press('Backspace');
    await this.dateInput.fill(date);
  }

  async fillRemark(remark: string) {
    await this.remarkInput.fill(remark);
  }

  async fillLeaveForm(
    date: string,
    remark: string,
    requestFor: string | null,
    annualLeave: string
  ) {
    await this.selectRequestFor(requestFor);
    await this.selectLeaveType(annualLeave);
    await this.setDate(date);
    await this.fillRemark(remark);

    await this.page.waitForLoadState('networkidle');
  }

  async saveAsDraft() {
    await this.draftButton.click();
    await expect(
      this.page.getByText('Successfully save request as draft')
    ).toBeVisible({ timeout: 10000 });
  }

  async sendToApprover() {
    await this.sendToApproverButton.click();
    await expect(
      this.page.getByText('Successfully Insert New Data, Your Request is Complete')
    ).toBeVisible({ timeout: 10000 });
  }
}
