function onRejected(error) {
    console.log(`An error: ${error}`);
}

/*
 * Build the New Tab web page
 */
function buildPage() {
    document.querySelector('title').textContent = options.title;
    document.getElementById('title').textContent = options.title;
    document.getElementById('introduction').textContent = options.introduction;

    const scale = parseFloat(options.fontSize) || 100;
    document.documentElement.style.setProperty('--font-scale', scale / 100);

    document.getElementById('font-increase').addEventListener('click', () => changeFontSize(10));
    document.getElementById('font-decrease').addEventListener('click', () => changeFontSize(-10));
}

function changeFontSize(delta) {
    const current = parseFloat(options.fontSize) || 100;
    const next = Math.min(150, Math.max(70, current + delta));
    options.fontSize = String(next);
    document.documentElement.style.setProperty('--font-scale', next / 100);
    browser.storage.local.set({ options });
}

/*
 * Find the configured root folder node in the bookmark tree
 */
function findRootFolder(bookmarkItem) {
    if (bookmarkItem.type === 'folder' &&
        bookmarkItem.parentId === 'menu________' &&
        bookmarkItem.title === options.folder) {
        return bookmarkItem;
    }
    if (bookmarkItem.children) {
        for (const child of bookmarkItem.children) {
            const found = findRootFolder(child);
            if (found) return found;
        }
    }
    return null;
}

/*
 * Build a single bookmark card element
 */
function createCard(item) {
    const elemLi = document.createElement("li");

    const elemCard = document.createElement("a");
    elemCard.className = "card";
    elemCard.href = item.url;

    const elemContent = document.createElement("div");
    elemContent.className = "content";

    const elemTitle = document.createElement("div");
    elemTitle.className = "title";
    elemTitle.textContent = item.title;

    const elemUrl = document.createElement("div");
    elemUrl.className = "url";
    elemUrl.textContent = item.url;

    elemContent.append(elemTitle);

    if (options.showUrl === "true") {
        elemContent.append(elemUrl);
    }

    if (options.showFavicon === "true") {
        const elemImg = document.createElement("img");
        elemImg.src = "https://www.google.com/s2/favicons?domain_url=" + item.url;
        elemCard.append(elemImg);
    }

    elemCard.append(elemContent);
    elemLi.append(elemCard);
    return elemLi;
}

/*
 * Build a group section for a subfolder
 */
function createGroup(folder) {
    const bookmarks = (folder.children || []).filter(c => c.type === 'bookmark');
    if (bookmarks.length === 0) return null;

    const section = document.createElement("section");
    section.className = "group";

    const heading = document.createElement("h2");
    heading.className = "group-title";
    heading.textContent = folder.title;

    const ul = document.createElement("ul");
    ul.className = "group-list";

    for (const item of bookmarks) {
        ul.append(createCard(item));
    }

    section.append(heading);
    section.append(ul);
    return section;
}

/*
 * Render the root folder contents into #favorites.
 * Direct bookmark children are shown as a flat list.
 * Subfolder children are each rendered as a titled group box.
 */
function renderFavorites(rootFolder) {
    const container = document.getElementById("favorites");
    const children = rootFolder.children || [];

    const directBookmarks = children.filter(c => c.type === 'bookmark');
    const subfolders = children.filter(c => c.type === 'folder');

    if (subfolders.length > 0) {
        for (const folder of subfolders) {
            const group = createGroup(folder);
            if (group) container.append(group);
        }

        if (directBookmarks.length > 0) {
            const othersFolder = { title: browser.i18n.getMessage("groupOthers") || "Others", children: directBookmarks };
            const group = createGroup(othersFolder);
            if (group) container.append(group);
        }
    } else {
        const ul = document.createElement("ul");
        ul.className = "group-list";
        for (const item of directBookmarks) {
            ul.append(createCard(item));
        }
        container.append(ul);
    }
}

function parseTree(bookmarkTree) {
    const rootFolder = findRootFolder(bookmarkTree[0]);
    if (rootFolder) {
        renderFavorites(rootFolder);
    }
}

function init(res) {
    options = res.options || {};
    buildPage();
    browser.bookmarks.getTree().then(parseTree, onRejected);
}

let options = {};

browser.storage.local.get("options").then(init, onRejected);
