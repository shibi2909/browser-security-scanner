chrome.storage.local.get("warning", function (data) {
  document.getElementById("warning").innerText =
    data.warning || "No threats detected";
});
