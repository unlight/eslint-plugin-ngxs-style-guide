# eslint-plugin-ngxs-style-guide

ESLint rules for [ngxs](https://www.ngxs.io) state manager.

## Install

```
npm install --save-dev eslint-plugin-ngxs-style-guide
```

## Usage

Configure it in [your configuration file](https://eslint.org/docs/user-guide/configuring):

1. Add to `plugins` section:

```
ngxs-style-guide
```

2. Add to `extends` section (optional):

```
plugin:ngxs-style-guide/recommended
```

3. [Configure rules](https://eslint.org/docs/user-guide/configuring#configuring-rules)

## Rules

NGXS style guide - https://www.ngxs.io/recipes/style-guide

-   `ngxs-style-guide/state-suffix` A state should always be suffixed with the word `State`. Right: `ZooState` Wrong: `Zoo`
-   `ngxs-style-guide/state-filenames` States should have a `.state.ts` suffix for the filename
-   `ngxs-style-guide/state-interfaces` State interfaces should be named the name of the state followed by the `Model` suffix
-   `ngxs-style-guide/select-suffix` Selects should have a `$` suffix
-   `ngxs-style-guide/action-suffixes` Actions should NOT have a suffix
-   `ngxs-style-guide/plugin-suffix` Plugins should end with the `Plugin` suffix
-   `ngxs-style-guide/no-subscribe-in-actions` Possible error https://stackoverflow.com/questions/56122116/do-not-subscribe-to-actions-ngxs
-   `ngxs-style-guide/no-pipe-dispatch` No pipe() after dispatch

## Todo

-   return observable from action
-   selector inject it must be after
    @State<StateModel>({
    name: 'supplier',
    defaults: defaultState,
    })
    @Injectable({ providedIn: 'root' })
