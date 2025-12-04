import { Page, Locator, expect } from '@playwright/test';

export class AddSingleClaimPage {
    private page: Page;

    //Locator
    private inputclaimType: Locator;
    private optionClaimType: Locator;
    private amountInput: Locator;
    private remarkInput: Locator;
    private buttonDraft: Locator;
    private buttonSendToApprover: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.inputclaimType = page.getByLabel('Claim Type');
        this.optionClaimType = page.getByText('Medical Claim');

        this.amountInput = page.getByRole('row', { name: '* Amount : IDR' }).getByRole('textbox');
        this.remarkInput = page.getByLabel('Remark');

        this.buttonDraft = page.getByRole('button', { name: 'Draft' });
        this.buttonSendToApprover = page.getByRole('button', { name: 'Send To Approver' });
    }

    async open() {
        await this.page.goto('/standard/hrm.reimbursement.claim.Add');
    }

    async selectClaimType() {
        await this.inputclaimType.click();
        await this.optionClaimType.click();
    }

    async inputAmount(amount: string) {
        await expect(this.amountInput).toBeVisible();
        await this.amountInput.fill(amount);
    }

    async inputRemark(remark: string) {
        await this.remarkInput.fill(remark);
    }

    async saveAsDraft() {
        await this.buttonDraft.click();
        await expect(this.page.getByText('Successfully save request as draft')).toBeVisible();
    }

    async sendToApprover() {
        await this.buttonSendToApprover.click();
        await expect(this.page.getByText('Successfully create new request')).toBeVisible();
    }

    async fillFormSingleClaim(
        amount: string,
        remark: string
    ){
        await this.selectClaimType();
        await this.inputAmount(amount);
        await this.inputRemark(remark);
        await this.page.waitForTimeout(2000);
    }
}