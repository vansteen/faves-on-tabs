function onRejected(error) {
    console.log(`An error: ${error}`);
}

/*
 * Build the New Tab web page
 */
function buildPage() {
    let title = options.title;
    let introduction = options.introduction;

    document.querySelector('title').textContent = title;  // Page title
    document.getElementById('title').textContent = title; // H1
    document.getElementById('introduction').textContent = introduction;  // Introduction sentence
}

/*
 * Parse the Bookmark tree
 */
function parseTree(bookmarkTree) {
    findFolders(bookmarkTree[0]);
    if (folders.length > 0) {
        findBookmarks(bookmarkTree[0], folders);
    }
}

/*
 * Recursively find the folders
 */
function findFolders(bookmarkItem) {
    if (bookmarkItem.type == 'folder') {
        if ((bookmarkItem.parentId == 'menu________') && (bookmarkItem.title == options.folder)) {
            folders.push(bookmarkItem.id);
        }
    }
    if (bookmarkItem.children) {
        for (child of bookmarkItem.children) {
            findFolders(child);
        }
    }
}

/*
 * Recursively find the bookmarks
 */
function findBookmarks(bookmarkItem, folders) {

    if (bookmarkItem.type == 'bookmark') {
        if (folders.indexOf(bookmarkItem.parentId) >= 0) {
            appendToList(bookmarkItem);
        }
    }
    if (bookmarkItem.children) {
        for (child of bookmarkItem.children) {
            findBookmarks(child, folders);
        }
    }
}

/*
 * Build the bookmark list
 */
function appendToList(item) {
    const elemLi = document.createElement("li");

    const elemCard = document.createElement("a");
    elemCard.setAttribute("class", "card");
    elemCard.setAttribute("href", item.url);

    const elemContent = document.createElement("div");
    elemContent.setAttribute("class", "content");

    const elemA = document.createElement("div");
    elemA.setAttribute("class", "title");
    elemA.textContent = item.title;

    const elemP = document.createElement("div");
    elemP.setAttribute("class", "url");
    elemP.textContent = item.url;

    elemContent.append(elemA);

    if (options.showUrl == "true") {
        elemContent.append(elemP);
    }

    if (options.showFavicon == "true") {
        const elemImg = document.createElement("img");
        const faviconUrl = "https://www.google.com/s2/favicons?domain_url=" + item.url;
        elemImg.setAttribute("src", faviconUrl);

        elemCard.append(elemImg);
    }

    elemCard.append(elemContent);
    elemLi.append(elemCard);

    document.querySelector("#favorites").appendChild(elemLi);
}

function init(res) {
    options = res.options || {};

    buildPage();

    browser.bookmarks.getTree()
        .then(parseTree, onRejected);
}

let options = {};
let folders = [];

/**
 * When the script loads, get the options, then init.
 * If we couldn't inject the script, handle the error.
 */
browser.storage.local.get("options")
    .then(init, onRejected)
