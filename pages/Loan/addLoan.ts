import { Page, Locator, expect } from '@playwright/test';

export class AddLoan {
    private page: Page;

    //locator
    private buttonAdd: Locator;
    private typeOfLoan: Locator;
    private loanAmount: Locator;
    private loanPeriod: Locator;
    private calculate: Locator;
    private remark: Locator;
    private buttonDraft: Locator;
    private buttonSendToApprove: Locator;

    constructor(page: Page){
        this.page = page;
        
        this.buttonAdd = page.getByRole('button', { name: 'Add' });
        this.typeOfLoan = page.locator("div[field_id='loan_code'] div[class='ant-form-item-control-input']")
        this.loanAmount = page.getByLabel('Loan Amount');
        this.loanPeriod = page.getByLabel('Loan Period');
        this.calculate = page.getByRole('button', { name: 'Calculate' });
        this.remark = page.getByLabel('Remark');
        this.buttonDraft = page.getByRole('button', { name: 'Save as Draft' });
        this.buttonSendToApprove = page.getByRole('button', { name: 'Send to Approve' });
    }

    async open() {
        await this.page.goto('standard/hrm.loan.loan-request');
    }

    async addButton() {
        await this.buttonAdd.click();
    }

    async fillTypeOfLoan(
        optionLoan: string
    ) {
        await this.typeOfLoan.click();
        await this.page.getByText(optionLoan).click();
    }

    async fillLoanAmount(amount: string) {
        await this.loanAmount.fill(amount);
    }

    async fillLoanPeriod(period: string) {
        await this.loanPeriod.fill(period);
    }

    async clickCalculate() {
        await this.calculate.click();
    }

    async fillRemark(remark: string) {
        await this.remark.fill(remark);
    }

    async saveAsDraft() {
        await this.buttonDraft.click();
        await expect(this.page.getByText('Success!'));
    }

    async sendToApprover() {
        await this.buttonSendToApprove.click();
        await expect(this.page.getByText('Success!'));
    }

    async fillAllForm(
        optionLoan: string,
        loanAmount: string,
        loanPeriod: string,
        remark: string
    ) {
        await this.fillTypeOfLoan(optionLoan);
        await this.fillLoanAmount(loanAmount);
        await this.fillLoanPeriod(loanPeriod);
        await this.calculate.click();
        await this.fillRemark(remark);
        await this.page.waitForTimeout(2000);
    }
    
}