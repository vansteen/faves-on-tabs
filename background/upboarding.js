
async function handleUpdated(details) {
    if (details.reason == "update") {
        const url = browser.runtime.getURL("pages/upboarding.html");
        await browser.tabs.create({ url });
    }
}

// Detecting when event is being dispatched.
browser.runtime.onInstalled.addListener(handleUpdated);
