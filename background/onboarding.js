

async function handleInstalled(details) {
    if (details.reason == "install") {

        // Default options
        let defaultFolder = browser.i18n.getMessage("defaultFolder");
        let defaultTitle = browser.i18n.getMessage("defaultTitle");
        let defaultIntroduction = browser.i18n.getMessage("defaultIntroduction");

        // Create the bookmark folder
        let createBookmark = browser.bookmarks.create({
            parentId: "menu________",
            title: defaultFolder
        });

        // Set the default options on installation.
        browser.storage.local.set({
            options: {
                folder: defaultFolder,
                title: defaultTitle,
                introduction: defaultIntroduction,
                showFavicon: "true",
                showUrl: "false",
            }
        });

        // Language
        let language = browser.i18n.getUILanguage();

        // Page
        let file = "pages/onboarding.en.html";
        if (language == 'fr') {
            file = "pages/onboarding.fr.html";
        }

        // Open Installed page
        const url = browser.runtime.getURL(file);
        await browser.tabs.create({ url });

    }
}

// Detecting when event is being dispatched.
browser.runtime.onInstalled.addListener(handleInstalled);
