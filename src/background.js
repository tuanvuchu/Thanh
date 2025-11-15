chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status !== "complete") {
    return;
  }
  if (tab.url.includes("facebook.com/stories")) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["assets/content.js"],
      })
      .catch((error) => console.error(error));
  }
});
