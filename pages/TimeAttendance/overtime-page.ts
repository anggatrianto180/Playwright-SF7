import { Page, Locator, expect } from '@playwright/test';

export class OvertimePage {
  private page: Page;

  // Locators
  private addButton: Locator;
  private remarkInput: Locator;
  private dateInput: Locator;
  private startTimeInput: Locator;
  private endTimeInput: Locator;
  private overtimeReasonDropdown: Locator;
  private overtimeReasonOption: Locator;
  private buttonDraft: Locator;
  private buttonSendToApprover: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.remarkInput = page.getByLabel('Remark');
    this.dateInput = page.getByPlaceholder('DD MMM');

    // Time inputs — SHOULD NOT depend on default "value"
    this.startTimeInput = page.locator('(//input[contains(@class,"timepicker")])[1]');
    this.endTimeInput = page.locator('(//input[contains(@class,"timepicker")])[2]');

    this.overtimeReasonDropdown = page.locator('#OvertimeRequestAdd_OVTREASON');
    this.overtimeReasonOption = page.locator("div[title='Overtime']");

    this.buttonDraft = page.getByRole('button', { name: 'Draft' });
    this.buttonSendToApprover = page.getByRole('button', { name: 'Send To Approver' });
  }

  async open() {
    await this.page.goto('/standard/hrm.time-and-attendance.attendance-request.overtime-request');
  }

  async clickAdd() {
    await this.addButton.click();
  }

  async selectOvertimeReason() {
    await this.overtimeReasonDropdown.click();
    await this.overtimeReasonOption.click();
  }

  async inputRemark(remark: string) {
    await this.remarkInput.fill(remark);
  }

  async inputDate(date: string) {
    await this.dateInput.click({ clickCount: 3 });
    await this.dateInput.fill(date);
    await this.dateInput.press('Enter');
  }

  async inputTime(startTime: string, endTime: string) {
    await this.startTimeInput.fill(startTime);
    await this.endTimeInput.fill(endTime);
  }

  async fillFormOvertime(
    remark: string,
    date: string,
    startTime: string,
    endTime: string
  ) {
    await this.clickAdd();
    await this.selectOvertimeReason();
    await this.inputRemark(remark);
    await this.inputDate(date);
    await this.inputTime(startTime, endTime);
  }

  async saveAsDraft() {
    await this.buttonDraft.click();
    await expect(this.page.getByText('Successfully save request as draft')).toBeVisible();
  }

  async sendToApprover() {
    await this.buttonSendToApprover.click();
    await expect(
      this.page.getByText('Successfully Insert New Data, Your Request is Complete')
    ).toBeVisible();
  }
}
