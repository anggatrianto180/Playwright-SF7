import { test, expect, Page } from '@playwright/test';
import { AddSingleClaimPage } from '../../pages/Reimbursement/addSingleClaim';

test.describe('Claim Request', () => {
    test('Add Single Claim - Save As Draft', async ({ page }) => {
        const claim = new AddSingleClaimPage(page);

        await claim.open();
        await claim.fillFormSingleClaim('30000', 'Claim');
        await claim.saveAsDraft();
    })
    test('Add Single Claim - Send To Approve', async ({ page }) => {
        const claim = new AddSingleClaimPage(page);

        await claim.open();
        await claim.fillFormSingleClaim('30000', 'Claim');
        await claim.sendToApprover();
    })
    
})