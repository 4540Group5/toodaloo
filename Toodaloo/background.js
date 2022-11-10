/*
Called when the contextMenu has been created, or when it failed due to an error.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}


/*
Called when there is an error.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create the context menu and make the extension appear on the menu so user
can open it through context menu.
*/

browser.contextMenus.create({
  id: "open-sidebar",
  title: browser.i18n.getMessage("menuItemOpenSidebar"),
  contexts: ["all"],
  command: "_execute_sidebar_action"
}, onCreated);



/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.contextMenus.onClicked.addListener((info) => {
  switch (info.menuItemId) {
    case "open-sidebar":
      console.log("Opening my sidebar");
      break;
  }
});

/* 
Allows the extension to appear in the browser toolbar and opens the sidebar
to-do list when clicking on the extension icon in the browser
*/
browser.browserAction.onClicked.addListener(async () => { 
  browser.browserAction.onClicked.addListener(() => {
    browser.sidebarAction.open();
  });
});

