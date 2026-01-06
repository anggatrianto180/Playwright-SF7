import { Page, expect } from '@playwright/test';

export class TrainingCalendar {
    private page: Page;

    //Locators
    name;

    constructor(page: Page) {
        this.page = page;
        this.name = page.getByRole('heading', { name: 'Gordon Enns' });
    }

    async open() {
        await this.page.goto('ent/hrm.training.my-calendar');
    }

    async verifyname() {
        await expect(this.name).toBeVisible();
    }
}
