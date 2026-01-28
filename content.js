console.log("Browser Security Scanner is running");

function scanPage() {
  const passwordFields = document.querySelectorAll("input[type='password']");
  const isHTTPS = window.location.protocol === "https:";

  // Case 1: Password field + NOT HTTPS (HIGH RISK)
  if (passwordFields.length > 0 && !isHTTPS) {
    chrome.storage.local.set({
      warning: "🔴 HIGH RISK: This page asks for your password but is NOT secure (No HTTPS). Do NOT enter credentials!"
    });
  }

  // Case 2: Password field + HTTPS (Normal caution)
  else if (passwordFields.length > 0 && isHTTPS) {
    chrome.storage.local.set({
      warning: "🟡 Caution: This page asks for your password. Make sure the website is trusted."
    });
  }

  // Case 3: No password field
  else {
    chrome.storage.local.set({
      warning: "🟢 No threats detected"
    });
  }
}

// Run when page loads
scanPage();

// Watch for dynamic pages (Facebook, Gmail, etc.)
const observer = new MutationObserver(scanPage);
observer.observe(document.body, {
  childList: true,
  subtree: true
});
