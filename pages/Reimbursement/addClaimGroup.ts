import { Page, Locator, expect } from '@playwright/test';

export class AddClaimGroup {
    private page: Page;

    //Locator
    private buttonAddClaim: Locator;
    private amountInput: Locator;
    private remarkInput: Locator;
    private buttonAddClaimForm: Locator;
    private buttonSubmit: Locator;
    private buttonSaveAsDraft: Locator;
    
    constructor(page: Page) {
        this.page = page;
        
        this.buttonAddClaim = page.getByRole('button', { name: 'plus Add' });
        this.amountInput = page.getByRole('row', { name: '* Amount IDR' }).getByRole('textbox');
        this.remarkInput = page.getByLabel('Remark');
        this.buttonAddClaimForm = page.getByRole('button', { name: 'Add', exact: true });
        this.buttonSubmit = page.getByRole('button', { name: 'Submit' });
        this.buttonSaveAsDraft = page.getByRole('button', { name: 'Save as Draft' });
    }

    async inputClaimType(
        claimtype: string | null,
        typeofclaim: string | null
    ) {
            if (claimtype && typeofclaim) {
            await this.page.getByLabel(typeofclaim).click();
            await this.page.getByText(claimtype).click();
        }
    }

    async open(){
        await this.page.goto('/standard/hrm.reimbursement.claim.add-claim-group');
    }

    async inputAmount(amount: string) {
        await this.amountInput.fill(amount);
    }

    async inputRemark(remark: string) {
        await this.remarkInput.fill(remark);
    }

    async buttonClaimAdd() {
        await this.buttonAddClaim.click();
    }

    async addButton(){
        await this.buttonAddClaim.click();
    }

    async addButtonForm(){
        await this.buttonAddClaimForm.click();
    }
    
    async submitButton(){
        await this.buttonSubmit.click();
        await expect(this.page.getByText('Successfully Add Claim Group')).toBeVisible();
    }

    async saveAsDraftButton(){
        await this.buttonSaveAsDraft.click();
        await expect(this.page.getByText('Successfully Add Claim Group as Draft')).toBeVisible();
    }

    async fillFormClaimGroup(
        claimtype: string | null,
        typeofclaim: string | null,
        amount: string,
        remark: string
    ){
        await this.inputClaimType(claimtype, typeofclaim);
        await this.inputAmount(amount);
        await this.inputRemark(remark);
        await this.page.waitForTimeout(2000);
    }

}