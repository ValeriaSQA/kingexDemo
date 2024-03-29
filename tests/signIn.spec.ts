import {expect, test} from '@playwright/test';
import {SignInPage} from '@pageObjects/SignInPage';
import {faker} from '@faker-js/faker';
import generator from 'generate-password';

const email = faker.internet.email();
const password = generator.generate({
  length: 10,
  numbers: true,
  symbols: true,
  uppercase: true,
  strict: true
});

test.describe('Sign In E2E @signIn', () => {
  test('Check that an unregistered user is unable to Sign In @signInError', async ({page}) => {
    const signIn = new SignInPage(page);
    await signIn.navigateToSignInPage();
    await signIn.signIn(email, password);
    await expect(page).toHaveURL('/auth/signin');
  });
});
