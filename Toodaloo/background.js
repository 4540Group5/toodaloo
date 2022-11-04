/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}


/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/

browser.contextMenus.create({
  id: "open-sidebar",
  title: browser.i18n.getMessage("menuItemOpenSidebar"),
  contexts: ["all"],
  command: "_execute_sidebar_action"
}, onCreated);

/*
Set a colored border on the document in the given tab.
Note that this only work on normal web pages, not special pages
like about:debugging.
*/
let blue = 'document.body.style.border =  "5px solid blue"';
let green = 'document.body.style.border = "5px solid green"';

function borderify(tabId, color) {
  browser.tabs.executeScript(tabId, {
    code: color
  });
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.contextMenus.onClicked.addListener((info) => {
  switch (info.menuItemId) {
    case "log-selection":
      console.log(info.selectionText);
      break;
    case "open-sidebar":
      console.log("Opening my sidebar");
      break;
  }
});

browser.browserAction.onClicked.addListener(async () => { 
  browser.browserAction.onClicked.addListener(() => {
    browser.sidebarAction.open();
  });
});

