<!-- Copilot / AI agent instructions for FSF 2C Frontend -->

Purpose
- Provide concise, actionable guidance so an AI coding agent can be productive immediately.

Big picture
- Angular 18 single-page app located under `src/` with feature modules in `src/app/modules/`.
- Entry points: `src/main.ts`, `src/app/app.module.ts`, routing in `src/app/app.route.ts`.
- Build uses Angular CLI with the `browser-esbuild` builder (see `angular.json` -> `architect.build.builder`).
- Global state is managed with NgRx (store slice roots under `src/app/store/`, see `index.reducer.ts`).

Key files to understand first
- `package.json`: scripts, husky hooks, and CI/release tools (semantic-release / release-it). Use `npm start`, `npm run build-prod`, `npm run watch`.
- `angular.json`: build/serve configurations, `fileReplacements` for environments, styles and scripts arrays, and the esbuild builder.
- `src/environments/*`: environment-specific constants; replaced at build time (production/staging).
- `src/app/service/app.service.ts`: app bootstrap behaviors (theme, locale, localStorage keys) — a good source for runtime conventions.
- `src/app/theme.config.ts`: default theme/menu/layout values referenced throughout the UI.

Developer workflows & important commands
- Install: `npm ci` (preferred in CI) or `npm install`.
- Dev server (with proxy): `npm start` (runs `ng serve --open --proxy-config ./proxy.conf.json`).
- Build development/watch: `npm run watch`.
- Production build: `npm run build-prod` (uses `--configuration production`).
- Tests: `npm test` (Karma + Jasmine).
- Lint/format: `npm run lint`, `npm run format:check`, `npm run format:write`.
- Sonar analysis: `npm run sonar` (calls `sonar-scanner`).
- Pre-commit: Husky runs `npm run build && lint-staged` (so CI/format must pass locally before committing).

Project-specific conventions
- Commit messages: Conventional Commits (see root `README.md`); releases depend on commit types. Example: `feat(PGD-123): add X`.
- Branch naming: include Jira key `PGD-<issue-number>-<topic>`.
- Local runtime settings are stored in `localStorage` keys referenced in `AppService`: `theme`, `menu`, `layout`, `i18n_locale`, `rtlClass`, `animation`, `navbar`, `semidark`.
- Store actions are simple objects dispatched like `{ type: 'toggleTheme', payload: val }` — search codebase for `'toggle'` prefixed actions to find UI toggles.
- Styles and scripts are injected via `angular.json` (`assets/css/app.css`, `flatpickr` CSS and JS, `apexcharts` script) — add third-party CSS/JS here.

Integration & cross-component patterns
- i18n: `@ngx-translate/core` is used. Languages are switched via `AppService.toggleLanguage()` and a `languageList` in the store.
- Real-time: `@microsoft/signalr` is present in `package.json` for SignalR integrations — search for usages in modules if integrating realtime features.
- Date pickers: `flatpickr` + `flatpickr-hijri-calendar` are used; script included at `src/assets/js/flatpickr-hijri-calendar.min.js`.
- Asset mapping: logos are copied and remapped in `angular.json` to `/Theme/assets/images/` — be careful when referencing those paths in templates.

Build & compatibility notes
- The builder is `@angular-devkit/build-angular:browser-esbuild`. Some traditional Webpack plugins may not apply — prefer Angular CLI options and esbuild-friendly libraries.
- `allowedCommonJsDependencies` is empty in `angular.json` — if adding CommonJS libs, add them here to avoid build warnings.

Examples (quick searches)
- Find theme defaults: `src/app/theme.config.ts`.
- Find store shape: `src/app/store/index.reducer.ts`.
- See app-wide service bootstrap: `src/app/service/app.service.ts`.
- Modify environment values: `src/environments/environment.staging.ts` and `environment.production.ts` plus `angular.json` replacements.

If you modify code
- Keep commit messages Conventional (type(scope): subject) to ensure release tooling behaves correctly.
- Ensure `npm run build` passes locally before committing (Husky pre-commit enforces this).

When uncertain, ask the developer for:
- API base URLs and auth flow details (not present in environments by default).
- The intended SignalR hub endpoints and auth mechanism.

End of file
