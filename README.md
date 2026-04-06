
# Faves on Tabs

Faves on Tabs is a **Firefox extension**. It displays your favorite bookmarks when you open a new Tab Page.

Once installed, a bookmark folder titled "*FavesOnTabs*" is created.

Then you simply need to add bookmarks to this folder to display the links each time you open a new browser tab.

*Firefox Add-on URL*: https://addons.mozilla.org/en-US/firefox/addon/faves-on-tabs/

## Development

### web-ext

[web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) is Mozilla's CLI tool for developing, testing, and packaging Firefox extensions.

Install it globally:

    npm install --global web-ext

**Run in Firefox** — launches a temporary Firefox profile with the extension loaded, and auto-reloads on file changes:

    web-ext run

By default this opens Firefox. You can target a specific binary:

    web-ext run --firefox="/Applications/Firefox.app/Contents/MacOS/firefox"

**Lint** — checks the code and manifest for errors and compatibility issues:

    web-ext lint

**Build** — packages the extension into a `.zip` ready for submission to AMO:

    web-ext build

The output is placed in `web-ext-artifacts/`. You can load it manually in Firefox via `about:addons` → "Install Add-on From File".

---

### Debugging

**Open the extension debugger**

1. In Firefox, navigate to `about:debugging` and click **This Firefox**
2. Find **Faves on Tabs** under "Temporary Extensions" (after `web-ext run`) or "Installed Extensions"
3. Click **Inspect** to open a dedicated DevTools window for the extension

**New Tab page**

The new tab page (`pages/newtab.html`) runs in a privileged context. Right-click anywhere on a new tab → **Inspect Element** opens DevTools scoped to that page. The Console, Sources, and Network tabs all work normally.

**Background scripts**

Background scripts (`background/*.js`) do not have a visible page. Inspect them via:
- `about:debugging` → **Inspect** next to the extension → switch to the **Console** tab

**Storage**

Inspect the current saved options from the background script console:

    browser.storage.local.get("options").then(console.log)

**Temporary vs permanent install**

- `web-ext run` → temporary install, cleared when Firefox closes, no ID assigned
- Install from AMO or a signed `.xpi` → permanent install, survives restarts

