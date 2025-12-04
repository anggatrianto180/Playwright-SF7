import { Page, expect } from '@playwright/test';

export class AttendancePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/standard/home');
  }

  async recordTime() {
    await this.page.getByRole('button', { name: 'Record time' }).click();
  }

  async verifyRecordSuccess() {
    await expect(this.page.getByText('Successfully record time')).toBeVisible();
  }
}