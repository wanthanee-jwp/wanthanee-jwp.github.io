# GitHub Pages Deployment

Production URL: <https://wanthanee-jwp.github.io/>

## Initial setup

1. Create a public GitHub repository named `wanthanee-jwp.github.io` under the `wanthanee-jwp` account.
2. Push this project to the `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Open the **Actions** tab and confirm that the `Deploy to GitHub Pages` workflow succeeds.

Every later push to `main` will type-check, build, and deploy the site automatically. The workflow can also be run manually from the Actions tab.

## Local verification

```bash
npm ci --legacy-peer-deps
npm run typecheck
npx nuxt build --preset github_pages
npm run preview
```

The deployable output is generated in `.output/public`.

## Configuration

- The repository name must remain `wanthanee-jwp.github.io` so the site is served from `/`.
- The canonical and Open Graph URL defaults to `https://wanthanee-jwp.github.io` in `nuxt.config.ts`.
- Override the URL with `NUXT_PUBLIC_SITE_URL` only when moving to another production domain.
