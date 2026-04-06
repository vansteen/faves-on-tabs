async function handleWindowCreated(window) {
    if (window.type !== 'normal') return;

    const tabs = await browser.tabs.query({ windowId: window.id, active: true });
    if (tabs.length === 0) return;

    // Only redirect windows opened by the user (Ctrl+N), not windows opened
    // from a link (which would have an openerTabId set).
    if (!tabs[0].openerTabId) {
        browser.tabs.update(tabs[0].id, {
            url: browser.runtime.getURL('pages/newtab.html')
        });
    }
}

browser.windows.onCreated.addListener(handleWindowCreated);
