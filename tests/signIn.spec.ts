import { expect, test } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { SignInPage } from '@pageObjects/SignInPage';

test.describe('Sign In E2E @signIn', () => {
    test('Sign-in form is available @smoke', async ({ page }) => {
        const signIn = new SignInPage(page);
        await signIn.navigateToSignInPage();
        await expect(signIn.emailInput).toBeEditable();
        await expect(signIn.passwordInput).toBeEditable();
        await expect(signIn.passwordInput).toHaveAttribute('type', 'password');
    });

    test('Unregistered user is rejected @signInError', async ({ page }) => {
        const errorText = process.env.SIGN_IN_ERROR_TEXT?.trim();
        if (!errorText) {
            throw new Error('Set SIGN_IN_ERROR_TEXT to the exact invalid-credentials message shown by the test environment.');
        }
        const signIn = new SignInPage(page);
        const email = `test-${randomUUID()}@example.com`;
        const password = `Aa1!${randomUUID().slice(0, 6)}`;
        const errorMessage = page.getByText(errorText, { exact: true });

        await test.step('Open sign-in form', async () => {
            await signIn.navigateToSignInPage();
            await expect(errorMessage).toBeHidden();
        });
        await test.step('Submit unregistered credentials', async () => {
            await signIn.signIn(email, password);
        });
        await test.step('Verify explicit rejection and remaining on sign-in page', async () => {
            await expect(errorMessage).toBeVisible();
            await expect(page).toHaveURL('/auth/signin');
        });
    });
});
