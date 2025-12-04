import { test, expect, Page } from '@playwright/test';
import { AddClaimGroup } from '../../pages/Reimbursement/addClaimGroup';

test.describe('Add Claim Group', () => {
    test('Add Claim Group - Save As Draft', async ({ page }) => {
        const claim = new AddClaimGroup(page);

        await claim.open();
        await claim.addButton();
        await claim.fillFormClaimGroup('Medical Claim', 'Claim Type', '30000', 'Claim');
        await claim.addButtonForm();
        await claim.addButton();
        await claim.fillFormClaimGroup(null, null, '30000', 'Claim');
        await claim.addButtonForm();
        await claim.saveAsDraftButton();
    })

        test('Add Claim Group - Send to Approve', async ({ page }) => {
        const claim = new AddClaimGroup(page);

        await claim.open();
        await claim.addButton();
        await claim.fillFormClaimGroup('Medical Claim', 'Claim Type', '30000', 'Claim');
        await claim.addButtonForm();
        await claim.addButton();
        await claim.fillFormClaimGroup(null, null, '30000', 'Claim');
        await claim.addButtonForm();
        await claim.submitButton();
    })
    
})