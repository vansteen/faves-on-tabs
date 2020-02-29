function onSetURL() {
    console.log("Set uninstall URL");
}

function onError(error) {
    console.log(`Error: ${error}`);
}

let settingUrl = browser.runtime.setUninstallURL("https://www.1234.pm/favesontabs/offboarding.html");
settingUrl.then(onSetURL, onError);
