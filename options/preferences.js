function onError(error) {
    console.log(`Error: ${error}`);
}

function saveOptions(e) {
    browser.storage.local.set({
        options: {
            folder: document.getElementById('folder').value,
            title: document.getElementById('title').value,
            introduction: document.getElementById('introduction').value,
            showFavicon: document.querySelector('input[name=show-favicon]:checked').value,
            showUrl: document.querySelector('input[name=show-url]:checked').value,
            fontSize: document.getElementById('font-size').value,
        }
    });
    e.preventDefault();
}

function setOptions(result) {
    if (result.options) {
        document.getElementById('folder').value = result.options.folder;
        document.getElementById('title').value = result.options.title;
        document.getElementById('introduction').value = result.options.introduction;
        document.querySelector('#show-favicon-' + result.options.showFavicon).checked = result.options.showFavicon;
        document.querySelector('#show-url-' + result.options.showUrl).checked = result.options.showUrl;
        const fontSize = result.options.fontSize || '100';
        document.getElementById('font-size').value = fontSize;
        document.getElementById('font-size-value').textContent = fontSize + '%';
    }
}

function loadOptions() {
    let getting = browser.storage.local.get("options");
    getting.then(setOptions, onError);
}

document.addEventListener("DOMContentLoaded", loadOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.getElementById('font-size').addEventListener('input', function () {
    document.getElementById('font-size-value').textContent = this.value + '%';
});
