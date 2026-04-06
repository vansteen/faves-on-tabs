function onError(error) {
    console.log(`Error: ${error}`);
}

browser.runtime.setUninstallURL("https://www.1234.pm/favesontabs/offboarding.html")
    .then(null, onError);
