import { Page, Locator, expect } from '@playwright/test';

export class DeleteClaim{
    private page: Page;

    //Locator
    private buttonEditSingle: Locator;
    private buttonDeleteSingle: Locator;
    private buttonConfirmationDeleteSingle: Locator;
    private buttonEditGroup1: Locator;
    private buttonEditGroup2: Locator;
    private buttonDeleteGroup: Locator;
    private buttonConfirmationDeleteGroup: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.buttonEditSingle = page.locator('div.claim-item').filter({ hasText: 'IDR 30,000.00' }).getByRole('button', { name: 'edit' }).first();
        this.buttonDeleteSingle = page.getByRole('button', { name: 'Delete' })
        this.buttonConfirmationDeleteSingle = page.getByRole('button', { name: 'OK' });
        
        this.buttonEditGroup1 = page.locator('.claim-item').first()
        this.buttonEditGroup2 = page.locator('div.claim-item').filter({ hasText: 'IDR 30,000.00' }).locator('.ant-card-head a')
        this.buttonDeleteGroup = page.getByRole('button', { name: 'Delete Claim Group' });
        this.buttonConfirmationDeleteGroup = page.getByRole('button', { name: 'OK' });

    }

    async open(){
        await this.page.goto('/standard/hrm.reimbursement.claim');
    }

    async clickEditSingle(){
        await this.buttonEditSingle.click();
    }

    async clickDeleteSingle(){
        await this.buttonDeleteSingle.click();
        await this.buttonConfirmationDeleteSingle.click();
        await expect(this.page.getByText('Successfully delete data')).toBeVisible();
    }

    async clickEditGroup1(){
        await this.buttonEditGroup1.click();
        await this.buttonEditGroup2.click();
    }

    async clickDeleteGroup(){
        await this.buttonDeleteGroup.click();
        await this.buttonConfirmationDeleteGroup.click();
        await expect(this.page.getByText('Successfully Delete Claim Group')).toBeVisible();
    }

    async deleteSingleClaim(){
        await this.clickEditSingle();
        await this.clickDeleteSingle();
    }

    async deleteClaimGroup(){
        await this.clickEditGroup1();
        await this.clickDeleteGroup();
    }
}