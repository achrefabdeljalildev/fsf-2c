# NgRx to Signal Store Migration

This document describes the migration from NgRx Store to Angular Signals for UI state management.

## Overview

The application now uses a **signal-based store** (`UiSignalStore`) for all UI-related state (theme, menu, layout, RTL, navbar, locale, sidebar, etc.) while keeping the original NgRx reducer (`index.reducer.ts`) intact for backward compatibility if needed.

## Files Modified

### Core Store

- ✅ **Created**: `src/app/store/ui.signal.store.ts` - New signal-based store service
- ✅ **Kept**: `src/app/store/index.reducer.ts` - Original NgRx reducer (unchanged)

### Layout Components

- ✅ `src/app/layouts/header/header.ts` - Replaced `Store` with `UiSignalStore`
- ✅ `src/app/layouts/sidebar/sidebar.ts` - Migrated to signals
- ✅ `src/app/layouts/sidebar/sidebar.html` - Updated template to use `semidark()` signal
- ✅ `src/app/layouts/app-layout/app-layout.ts` - Migrated to signals
- ✅ `src/app/layouts/app-layout/app-layout.html` - Updated template bindings to use signals
- ✅ `src/app/layouts/auth-layout/auth-layout.ts` - Migrated to signals
- ✅ `src/app/layouts/auth-layout/auth-layout.html` - Already using signal bindings

### Services

- ✅ `src/app/shared/services/app.service.ts` - Replaced all `store.dispatch()` calls with signal store methods

### Auth Components

- ✅ `src/app/modules/auth/components/verification/verification.component.ts` - Migrated `toggleRTL` calls
- ✅ `src/app/modules/auth/components/forgot-password/forgot-password.component.ts` - Migrated `toggleRTL` calls

### Error Pages

- ✅ `src/app/shared/pages/error404.ts` - Migrated to signals
- ✅ `src/app/shared/pages/error500.ts` - Migrated to signals
- ✅ `src/app/shared/pages/error503.ts` - Migrated to signals
- ✅ `src/app/shared/pages/maintenence.ts` - Migrated to signals

### Documentation

- ✅ `docs/technical-documentation.md` - Added "Signals Store (Alternative)" section

## API Changes

### Before (NgRx)

```typescript
constructor(public storeData: Store<any>) {
  this.storeData.select((d) => d.index).subscribe((d) => {
    this.store = d;
  });
}

toggleTheme() {
  this.storeData.dispatch({ type: 'toggleTheme', payload: 'dark' });
}
```

### After (Signals)

```typescript
constructor(private baseStore: UiSignalStore) {}

// Access signals
readonly theme = this.baseStore.theme;
readonly sidebar = this.baseStore.sidebar;

// Toggle methods
toggleTheme() {
  this.baseStore.toggleTheme('dark');
}

toggleSidebar() {
  this.baseStore.toggleSidebar();
}
```

## Template Changes

### Before

```html
<div [ngClass]="store.sidebar ? 'active' : ''">
    <span>{{ store.theme }}</span>
</div>
```

### After

```html
<div [ngClass]="sidebar() ? 'active' : ''">
    <span>{{ theme() }}</span>
</div>
```

## Available Signal Store Methods

- `toggleTheme(theme?: 'light' | 'dark' | 'system')`
- `toggleMenu(menu?: 'vertical' | 'collapsible-vertical' | 'horizontal')`
- `toggleLayout(layout?: 'full' | 'boxed-layout')`
- `toggleRTL(rtl?: 'rtl' | 'ltr')`
- `toggleNavbar(navbar?: 'navbar-sticky' | 'navbar-floating' | 'navbar-static')`
- `toggleLocale(locale?: string)`
- `toggleSidebar()`
- `toggleSemidark(value?: boolean)`
- `toggleAnimation(animation?: string)`
- `toggleDirection(dir?: 'rtl' | 'ltr')`
- `toggleMainLoader(show: boolean)`
- `setTotalAwaitingApproval(value: any)`
- `setMainLayout(layout: 'app' | 'auth')`

## Benefits

1. **Simpler API**: Direct method calls instead of dispatching actions
2. **Type Safety**: Full TypeScript support with proper types
3. **Reactive**: Signals are automatically tracked by Angular
4. **Performance**: No subscription management needed
5. **Compatibility**: Original NgRx store remains for any edge cases

## Testing

To verify the migration works correctly:

```bash
npm run build
```

All UI state changes (theme, sidebar, RTL, etc.) should work exactly as before.

## Rollback Plan

If needed, the original NgRx store (`index.reducer.ts`) is still present and can be re-integrated by:

1. Reverting the import statements
2. Replacing `UiSignalStore` injections with `Store<any>`
3. Restoring `.dispatch()` and `.select()` patterns

## Next Steps

- Consider migrating other non-UI state to signals if beneficial
- Monitor performance and reactivity improvements
- Update developer documentation with signal patterns
