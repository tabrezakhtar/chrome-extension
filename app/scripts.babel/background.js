'use strict';

var tabId;

chrome.browserAction.onClicked.addListener( listener => {

    if (tabId) {

        chrome.tabs.update(tabId, {
            selected:true
        }, tab => {
            console.log('opened same tab');
        });

    }
    else {

        chrome.tabs.create( {
            url:chrome.extension.getURL('popup.html'),
            selected:true
        }, tab => {
            tabId = tab.id;
            console.log('new tab ' + tabId);
        });

    }

});

chrome.tabs.onRemoved.addListener(function(closedTabId) {
    if (closedTabId === tabId) {
        tabId = null;
    }
    console.log('removed tab ' + tabId);
});
