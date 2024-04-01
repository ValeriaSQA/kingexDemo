import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
    testDir: './tests',
    timeout: 50 * 1000,
    expect: {
        timeout: 50000
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 1,
    reporter: [
        [process.env.CI ? 'list' : 'list'],
        ['html', {open: 'never', outputFolder: 'playwright-report'}],
    ],
    use: {
        baseURL: 'https://new.kingex.io',
        trace: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },

        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },

        {
            name: 'webkit',
            use: {...devices['Desktop Safari']},
        }
    ]
});
