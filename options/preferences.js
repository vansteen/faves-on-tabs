function onError(error) {
    console.log(`Error: ${error}`);
}

function saveOptions(e) {
    console.log('saveOptions');
    console.log(document.querySelector('#folder').value);
    browser.storage.local.set({
        options: {
            folder: document.getElementById('folder').value,
            title: document.getElementById('title').value,
            introduction: document.getElementById('introduction').value,
            showFavicon: document.querySelector('input[name=show-favicon]:checked').value,
            showUrl: document.querySelector('input[name=show-url]:checked').value,
        }
    });
    e.preventDefault();
}

function setOptions(result) {
    if (result.options) {
        document.getElementById('folder').value = result.options.folder;
        document.getElementById('title').value = result.options.title;
        document.getElementById('introduction').textContent = result.options.introduction;
        document.querySelector('#show-favicon-' + result.options.showFavicon).checked = result.options.showFavicon;
        document.querySelector('#show-url-' + result.options.showUrl).checked = result.options.showUrl;
    }
}

function loadOptions() {
    let getting = browser.storage.local.get("options");
    getting.then(setOptions, onError);
}

document.addEventListener("DOMContentLoaded", loadOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
