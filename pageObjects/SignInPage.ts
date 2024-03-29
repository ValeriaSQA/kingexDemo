import {expect, Page} from '@playwright/test';

export class SignInPage {
  readonly page: Page;
  readonly emailInput: ReturnType<Page['locator']>;
  readonly passwordInput: ReturnType<Page['locator']>;
  readonly signInButton: ReturnType<Page['locator']>;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', {name: 'Sign in'});
  }

  async navigateToSignInPage(): Promise<this> {
    await this.page.goto('/auth/signin');
    await expect(this.signInButton).toBeVisible();
    return this;
  }

  async signIn(email: string,
               password: string): Promise<this> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    return this;
  }
}
