import type { FullConfig } from '@playwright/test';

export default function globalSetup(config: FullConfig): void {
    const baseURL = config.projects[0]?.use.baseURL;
    if (!baseURL) {
        throw new Error('Set BASE_URL in .env or the environment. See .env.example.');
    }

    let url: URL;
    try {
        url = new URL(baseURL);
    } catch {
        throw new Error('BASE_URL must be a valid absolute HTTP(S) URL.');
    }
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
        throw new Error('BASE_URL must use HTTP(S) and must not contain credentials.');
    }
    if (url.pathname !== '/' || url.search || url.hash) {
        throw new Error('BASE_URL must be the site origin without a path, query or fragment.');
    }
}
