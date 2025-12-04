import { test, expect, Page } from '@playwright/test';
import { DeleteClaim } from '../../pages/Reimbursement/deleteClaim';

test.describe('Delete Claim', () => {
    test('Delete Single Claim', async ({ page }) => {
        const claim = new DeleteClaim(page);

        await claim.open();
        await claim.deleteSingleClaim();
    })

    test('Delete Group Claim', async ({ page }) => {
        const claim = new DeleteClaim(page);

        await claim.open();
        await claim.deleteClaimGroup();
    })
})
