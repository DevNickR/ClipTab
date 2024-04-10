const FEEDBACK_DEFAULT_SHOW_TIME = 2000;

const MESSAGES = {
  SELECTED_URLS_COPIED: "Selected URLs copied to clipboard!",
  ALL_URLS_COPIED: "All URLs copied to clipboard!",
  SELECTED_URLS_SHUFFLED: "Selected tabs shuffled!",
  ALL_URLS_SHUFFLED: "All tabs shuffled!",
  ALL_URLS_PASTED: "URLs pasted from clipboard!",
  CLIPBOARD_EMPTY: "Clipboard is empty.",
};

const EVENTS = {
  CLICK: "click",
  DOM_CONTENT_LOADED: "DOMContentLoaded",
};

const ELEMENTS = {
  FEEDBACK_ID: "feedback",
  SHOW_FEEDBACK_CLASS: "show-feedback",
  COPY_BUTTON_ID: "copyButton",
  PASTE_BUTTON_ID: "pasteButton",
  SHUFFLE_BUTTON_ID: "shuffleButton",
};

async function getTabs(): Promise<chrome.tabs.Tab[]> {
  const highlightedTabs = await chrome.tabs.query({
    currentWindow: true,
    highlighted: true,
  });
  if (highlightedTabs.length > 1) {
    return highlightedTabs;
  } else {
    return chrome.tabs.query({ currentWindow: true });
  }
}

// Function to copy all tab URLs to clipboard
async function copyTabsToClipboard() {
  const tabs = await getTabs();
  const urls = tabs.map((tab) => tab.url).join("\n");
  await navigator.clipboard.writeText(urls);
  await showFeedback(
    tabs.length > 1 ? MESSAGES.SELECTED_URLS_COPIED : MESSAGES.ALL_URLS_COPIED
  );
}

async function pasteTabsFromClipboard() {
  const text = await navigator.clipboard.readText();
  if (!text.trim()) {
    await showFeedback(MESSAGES.CLIPBOARD_EMPTY);
    return;
  }

  const urls = text.split("\n").filter((url) => url.trim());

  urls.forEach((urlString) => {
    try {
      const url = new URL(urlString);
      chrome.tabs.create({ url: urlString });
    } catch (error) {
      console.error(`Url:'${urlString}' is invalid for opening a new tab`);
    }
  });

  await showFeedback(MESSAGES.ALL_URLS_PASTED);
}

// Function to shuffle the order of the tabs
async function shuffleTabs() {
  const tabs = await getTabs();
  for (let i = tabs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tabs[i], tabs[j]] = [tabs[j], tabs[i]];
  }
  tabs.forEach((tab, index) => chrome.tabs.move(tab.id!, { index }));
  await showFeedback(
    tabs.length > 1
      ? MESSAGES.SELECTED_URLS_SHUFFLED
      : MESSAGES.ALL_URLS_SHUFFLED
  );
}

async function showFeedback(message: string): Promise<void> {
  const feedbackElement = document.getElementById(ELEMENTS.FEEDBACK_ID);
  if (!feedbackElement) return;

  feedbackElement.textContent = message;
  feedbackElement.classList.add(ELEMENTS.SHOW_FEEDBACK_CLASS);

  // Wait for the specified time before removing the feedback class
  await new Promise((resolve) =>
    setTimeout(resolve, FEEDBACK_DEFAULT_SHOW_TIME)
  );

  feedbackElement.classList.remove(ELEMENTS.SHOW_FEEDBACK_CLASS);
}

// Event listeners for the buttons
document.addEventListener(EVENTS.DOM_CONTENT_LOADED, () => {
  document
    .getElementById(ELEMENTS.COPY_BUTTON_ID)
    ?.addEventListener(EVENTS.CLICK, copyTabsToClipboard);
  document
    .getElementById(ELEMENTS.PASTE_BUTTON_ID)
    ?.addEventListener(EVENTS.CLICK, pasteTabsFromClipboard);
  document
    .getElementById(ELEMENTS.SHUFFLE_BUTTON_ID)
    ?.addEventListener(EVENTS.CLICK, shuffleTabs);
});
