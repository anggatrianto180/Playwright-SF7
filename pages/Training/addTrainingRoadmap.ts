import { Page, expect } from '@playwright/test';

export class AddTrainingRoadmap {
    private page: Page;

    //locators
    buttonAdd;
    buttonAddNewTrainingRoadmap;
    roadmapCode;
    roadmapName;
    parent;
    jobTitle;
    buttonTransfer;
    effectiveDate;
    buttonSubmit;
    buttonConfirmation;
    validation;

    constructor(page: Page) {
        this.page = page;

        this.buttonAdd = page.getByRole('button', { name: 'Add' });
        this.buttonAddNewTrainingRoadmap = page.getByRole('button', { name: 'Create New Training Roadmap' });
        this.roadmapCode = page.getByRole('textbox', { name: 'Roadmap Code' });
        this.roadmapName = page.getByRole('textbox', { name: 'Roadmap Name' });
        this.parent = page.locator('#PARENTROADMAP_CODE');
        this.jobTitle = page.locator('.ant-transfer-list-content-item');
        this.buttonTransfer = page.locator('div.ant-transfer-operation').locator('button').nth(0);
        this.effectiveDate = page.getByLabel('Effective Date', { exact: true });
        this.buttonSubmit = page.getByRole('button', { name: 'Add' }).nth(1);
        this.buttonConfirmation = page.getByRole('button', { name: 'OK' });
        //validation
        this.validation = page.locator('.ant-table-row').first();
    }

    async open() {
        await this.page.goto('/ent/hrm.training.training-roadmap');
    }

    async clickButtonAdd() {
        await this.buttonAdd.click();
        await this.buttonAddNewTrainingRoadmap.click();
    }

    async inputRoadmapCode(roadmapCode: string) {
        await this.roadmapCode.fill(roadmapCode);
    }

    async inputRoadmapName(roadmapName: string) {
        await this.roadmapName.fill(roadmapName);
    }

    async inputParent(parent: string) {
        await this.parent.click();
        await this.parent.pressSequentially(parent, { delay: 100 });
        await this.parent.press('Enter');
    }

    async inputJobTitle() {
        await this.jobTitle.first().click();
        await this.buttonTransfer.click();
    }

    async inputEffectiveDate(date: string) {
        await this.effectiveDate.click();
        await this.page.waitForTimeout(1000);
        await this.effectiveDate.fill(date);
        await this.page.waitForTimeout(1000);
        await this.effectiveDate.press('Enter');
    }

    async fillForm(
        roadmapCode: string,
        roadmapName: string,
        parent: string,
        date: string
    ) {
        await this.clickButtonAdd();
        await this.inputRoadmapCode(roadmapCode);
        await this.inputRoadmapName(roadmapName);
        await this.inputParent(parent);
        await this.inputJobTitle();
        await this.inputEffectiveDate(date);
    }

    async submitForm() {
        await this.buttonSubmit.click();
        await this.buttonConfirmation.click();
    }

    //validation
    async validationSearch(roadmapName: string) {
        await this.page.goto('/ent/hrm.training.training-roadmap');
        await this.page.locator('span.ant-dropdown-trigger.ant-table-filter-trigger').click();
        await this.page.locator('[name="ROADMAP_NAME"]').fill(roadmapName);
        await this.page.waitForTimeout(1000);
        await this.page.locator('[name="ROADMAP_NAME"]').press('Enter');
        await this.page.locator('[name="ROADMAP_NAME"]').press('Escape');
    }
}