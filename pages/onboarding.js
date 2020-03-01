let options = {};

function onRejected(error) {
    console.log(`An error: ${error}`);
}

function buildPage() {
    let extensionName = browser.i18n.getMessage("extensionName");
    document.querySelector('title').textContent = extensionName;
    document.querySelector('#title').textContent = extensionName;
}

function init(res) {
    options = res.options || {};
    buildPage();
}

/**
 * When the script loads, get the settings
 * If we couldn't inject the script, handle the error.
 */
browser.storage.local.get("options")
    .then(init, onRejected)
