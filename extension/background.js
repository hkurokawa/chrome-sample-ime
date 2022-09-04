var context_id = -1;

console.log("Service worker reactivated");

chrome.input.ime.onActivate.addListener((engineID) => {
    console.log('onActivate. engineID=[' + engineID + ']');
});
chrome.input.ime.onDeactivated.addListener((engineID) => {
    console.log('onDeactivated. engineID=[' + engineID + ']');
});
chrome.input.ime.onFocus.addListener((context) => {
    console.log('onFocus. contextID=[' + context.contextID + ']');
    context_id = context.contextID;
});
chrome.input.ime.onBlur.addListener((contextID) => {
    console.log('onBlur. contextID=[' + contextID + ']');
    context_id = -1;
});

chrome.input.ime.onKeyEvent.addListener(
    (engineID, keyData) => {
        console.log('onKeyEvent. key=[' + keyData.key + "], contextID=[" + context_id + ']');
        if (context_id != -1 && keyData.type == "keydown" && keyData.key.match(/^[a-z]$/)) {
            chrome.input.ime.commitText({
                "contextID": context_id,
                "text": keyData.key.toUpperCase()
            });
            return true;
        }
        return false
    });
