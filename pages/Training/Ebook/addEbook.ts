import { Page, expect } from '@playwright/test';

export class AddEbook {
    private page: Page;

    //locators
    buttonAdd;
    bookTitle;
    description;
    author;
    tags;
    level;
    category;
    confirmation;
    buttonSubmit;
    buttonConfirmation;
    Validation;

    constructor(page: Page) {
        this.page = page;

        //constructor
        this.buttonAdd = this.page.getByRole('button', { name: 'Add eBook' });
        this.bookTitle = this.page.getByRole('textbox', { name: 'Book Title' });
        this.description = this.page.getByPlaceholder('Input Description');
        this.author = this.page.locator('.ant-select-selector').filter({ hasText: 'Input Author' });
        this.tags = this.page.locator('.ant-select-selector').filter({ hasText: 'Input Tags' });
        this.level = this.page.getByRole('combobox', { name: 'Level' });
        this.category = this.page.locator('.ant-select-selector').filter({ hasText: 'Select Category' });
        this.confirmation = this.page.getByRole('checkbox');
        this.buttonSubmit = this.page.getByRole('button', { name: 'Submit' });
        this.buttonConfirmation = this.page.getByRole('button', { name: 'OK' });

        this.Validation = page.locator('.ant-table-row').first();
    }

    async open() {
        await this.page.goto('https://demo.sunfishhr.com/ent/hrm.training.ebook');
    }

    async clickAdd() {
        await this.buttonAdd.click();
    }

    async fillBookTitle(bookTitle: string) {
        await this.bookTitle.fill(bookTitle);
    }

    async fillDescription(description: string) {
        await this.description.fill(description);

    }

    async fillAuthor(author: string) {
        await this.author.click();
        await this.author.pressSequentially(author);
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Escape');
    }

    async fillTags(tags: string) {
        await this.tags.click();
        await this.tags.pressSequentially(tags);
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Escape');
    }

    async fillLevel() {
        await this.level.click();
        await this.level.press('Enter');
    }

    async fillCategory() {
        await this.category.click();
        await this.category.press('Enter');
    }

    async fillCheckbox() {
        await this.confirmation.click();
    }

    async fillAddEbook(
        bookTitle: string,
        description: string,
        tags: string,

    ) {
        await this.fillBookTitle(bookTitle);
        await this.fillDescription(description);
        await this.fillTags(tags);
        await this.fillLevel();
        await this.fillCategory();
        await this.fillCheckbox();
    }

    async uploadDocument(filePath: string) {
        const uploadPromise = this.page.waitForResponse(response =>
            response.url().includes('/get-upload-config') && response.status() === 200
        );

        await this.clickAdd();
        await this.page.locator('input[type="file"]').setInputFiles(filePath);
        await uploadPromise;
        await this.page.waitForLoadState('networkidle');
    }

    async clickButtonSubmit() {
        await this.confirmation.dblclick();
        await this.buttonSubmit.click();
    }

    async clickConfirmationSubmit() {
        await this.buttonConfirmation.click();
    }

    async changeTotable(title: string) {
        await this.page.locator("//span[contains(@aria-label,'unordered-list')]//*[name()='svg']").dblclick();
        await this.page.getByRole('textbox', { name: 'Search' }).fill(title);
        await this.page.getByRole('textbox', { name: 'Search' }).press('Enter');
        await expect(this.page.locator('.ant-spin-spinning')).toBeHidden({ timeout: 15000 });
    }
}