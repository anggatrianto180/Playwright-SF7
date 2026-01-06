import { Page, expect } from '@playwright/test';

export class AddTrainingCourse {
    private page: Page;

    //Locators
    buttonAdd;
    buttonCreateNewCourse;
    courseCode;
    coursename;
    buttonCopy;
    courseLevel;
    optionCourseLevel;
    trainingCategory;
    trainingType;
    courseDescription;
    buttonCopyCourseDescription;
    background;
    objective;
    Provider;
    buttonTransferProvider;
    jobTitle;
    buttonTransferJobTitle;
    estimateCost;
    buttonSubmit;
    buttonConfirmation;
    Validation;

    //Locators
    constructor(page: Page) {
        this.page = page;

        this.buttonAdd = page.getByText('Add');
        this.buttonCreateNewCourse = page.getByRole('button', { name: 'Create New Course' })
        this.courseCode = page.getByRole('textbox', { name: /Course Code/i });
        this.coursename = page.locator('#TRNCOURSE_NAME_EN');
        this.buttonCopy = page.getByRole('img', { name: 'copy' }).first();
        this.courseLevel = page.getByRole('combobox', { name: 'Course Level' });
        this.optionCourseLevel = page.locator('div').filter({ hasText: 'Fundamental' }).first();
        this.trainingCategory = page.locator('#CAT_CODE');
        this.trainingType = page.locator('#TYPE_CODE');
        this.courseDescription = page.locator('#TRNCOURSE_DESC_EN');
        this.buttonCopyCourseDescription = page.locator("//div[8]//div[3]//div[1]//button[1]");
        this.background = page.getByRole('textbox', { name: 'Background' });
        this.objective = page.getByRole('textbox', { name: 'Objective' });
        this.Provider = page.getByRole('textbox', { name: 'Search Here' }).first();
        this.buttonTransferProvider = page.locator('div.ant-transfer-operation').locator('button').nth(0);
        this.jobTitle = page.getByRole('textbox', { name: 'Search Here' }).nth(2);
        this.buttonTransferJobTitle = page.locator('button.ant-btn.ant-btn-primary.ant-btn-sm.ant-btn-icon-only').nth(2);
        this.estimateCost = page.getByRole('textbox', { name: '0.00' });
        this.buttonSubmit = page.getByText('Submit');
        this.buttonConfirmation = page.getByText('OK', { exact: true });

        this.Validation = page.locator('.ant-table-row').first();
    }

    //Actions
    async open() {
        await this.page.goto('ent/hrm.training.manage-training-course');
    }

    async clickAdd() {
        await this.buttonAdd.click();
    }

    async clickCreateNewCourse() {
        await this.buttonCreateNewCourse.click();
    }

    async fillCourseCode(courseCode: string) {
        await this.courseCode.fill(courseCode);
    }

    async fillCourseName(courseName: string) {
        await this.coursename.fill(courseName);
        await this.buttonCopy.click();
    }

    async fillCourseLevel() {
        await this.courseLevel.click();
        await this.optionCourseLevel.press('Enter');
    }

    async fillTrainingCategory(trainingCategory: string) {
        await this.trainingCategory.fill(trainingCategory);
        await this.trainingCategory.press('Enter');
    }

    async fillTrainingType(trainingType: string) {
        await this.trainingType.fill(trainingType);
        await this.trainingType.press('Enter');
    }

    async fillCourseDescription(courseDescription: string) {
        await this.courseDescription.fill(courseDescription);
        await this.buttonCopyCourseDescription.click();
    }

    async fillBackground(background: string) {
        await this.background.fill(background);
    }

    async fillObjective(objective: string) {
        await this.objective.fill(objective);
    }

    async fillProvider(provider: string, listProvider: string) {
        await this.Provider.fill(provider);
        await this.page.getByText(listProvider).click();
        await this.buttonTransferProvider.click();
    }

    async fillJobTitle(jobTitle: string) {
        await this.jobTitle.fill(jobTitle);
        await this.page.locator('label.ant-checkbox-wrapper.ant-checkbox-wrapper-in-form-item.ant-transfer-list-checkbox').nth(1).click();
        await this.buttonTransferJobTitle.click();
    }

    async fillEstimateCost(estimateCost: string) {
        await this.estimateCost.fill(estimateCost);
    }

    async fillTrainingCourse(
        courseCode: string,
        courseName: string,
        trainingCategory: string,
        trainingType: string,
        courseDescription: string,
        background: string,
        objective: string,
        provider: string,
        listProvider: string,
        jobTitle: string,
        estimateCost: string) {
        await this.fillCourseCode(courseCode);
        await this.fillCourseName(courseName);
        await this.fillCourseLevel();
        await this.fillTrainingCategory(trainingCategory);
        await this.fillTrainingType(trainingType);
        await this.fillCourseDescription(courseDescription);
        await this.fillBackground(background);
        await this.fillObjective(objective);
        await this.fillProvider(provider, listProvider);
        await this.fillJobTitle(jobTitle);
        await this.fillEstimateCost(estimateCost);
    }

    async clickSubmit() {
        await this.buttonSubmit.click();
    }

    async clickbBttonConfirmation() {
        await this.buttonConfirmation.click();
        await expect(this.page.getByText('You have added Training course')).toBeVisible();
    }

    async changeToTable(code: string) {
        await this.page.locator("//span[@aria-label='unordered-list']//*[name()='svg']").click();
        await this.page.getByRole('textbox', { name: 'Training Course' }).fill(code);
        await this.page.getByRole('textbox', { name: 'Training Course' }).press("Enter");
    }
}