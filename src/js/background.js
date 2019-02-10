let newBookmarkId = null;

chrome.bookmarks.onCreated.addListener((id, bookmark) => {

    if (bookmark.title === 'NEW') {
        return;
    }
    newBookmarkId = id;

    console.log('bookmark added', id, bookmark);
    getNewFolder((newFolder => {
        chrome.bookmarks.move(id, {parentId: newFolder.id, index: 0});
    }));
});

chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
    if (id !== newBookmarkId) {
        return;
    }

    if (moveInfo.parentId === '1') {
        console.log('moving back', id, moveInfo);
        chrome.bookmarks.move(id, {parentId: moveInfo.oldParentId, index: 0}, () => {
            newBookmarkId = null;
        });
    }
});

chrome.bookmarks.onRemoved.addListener((id, bookmark) => {
    console.log('E:removed', id, bookmark);
});

function getNewFolder(callback) {
    chrome.bookmarks.search('NEW', (results) => {

        if (!results || !results.length) {
            return createNewFolder(newFolder => {
                callback(newFolder);
            });
        }

        const newFolder = results.find(r => !r.url && r.title === 'NEW');

        if (!newFolder) {
            return createNewFolder(newFolder => {
                callback(newFolder);
            });
        }

        callback(newFolder);
    });
}

function createNewFolder(callback) {
    chrome.bookmarks.create({parentId: '1', title: 'NEW'}, newFolder => {
        callback(newFolder);
    });
}