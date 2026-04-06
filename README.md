
# Faves on Tabs

Faves on Tabs is a **Firefox extension**. It displays your favorite bookmarks when you open a new Tab Page.

Once installed, a bookmark folder titled "*FavesOnTabs*" is created.

Then you simply need to add bookmarks to this folder to display the links each time you open a new browser tab.

## Groups

You can organize your bookmarks into groups by creating **subfolders** inside the main *FavesOnTabs* folder.

Each subfolder becomes a titled group box on the new tab page, with the subfolder name displayed as the group heading.

**Example structure in Firefox Bookmarks Menu:**

```
FavesOnTabs/
├── Work/
│   ├── Jira
│   └── Confluence
├── News/
│   ├── Hacker News
│   └── Le Monde
└── GitHub          ← direct bookmark, no subfolder
```

This renders as two group boxes ("Work", "News") followed by an "Others" group containing the direct bookmarks that don't belong to any subfolder.

If there are **no subfolders**, all bookmarks are displayed as a flat list with no grouping.

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



