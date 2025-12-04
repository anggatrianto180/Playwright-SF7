import { test, expect, Page } from '@playwright/test';
import { AddLoan } from '../../pages/Loan/addLoan';

test.describe('Add Loan', () => {
    test('Add Loan Request - Save As Draft', async ({ page }) => {
        const loan = new AddLoan(page);

        await loan.open();
        await loan.addButton();
        await loan.fillAllForm('Annuity Loan', '100000', '12','Remark')
        await loan.saveAsDraft();
    });

    test('Add Loan Request - Send To Approve', async ({ page }) => {
        
    });
    
    
})
