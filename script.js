async function translateText() {
    const text = document.getElementById("inputText").value.trim();
    const source = document.getElementById("sourceLang").value;
    const target = document.getElementById("targetLang").value;

    if (!text) {
        alert("Please enter text");
        return;
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("outputText").value =
            data.responseData.translatedText;

    } catch (error) {
        console.error(error);
        alert("Network error. Try again.");
    }
}

function copyText() {
    const output = document.getElementById("outputText").value;
    navigator.clipboard.writeText(output);
    alert("Copied!");
}

function speakText() {
    const text = document.getElementById("outputText").value;
    const targetLang = document.getElementById("targetLang").value;

    if (!text) {
        alert("Nothing to speak!");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Map language codes to speech language
    const langMap = {
        en: "en-US",
        ur: "ur-PK",
        hi: "hi-IN",
        fr: "fr-FR"
    };

    utterance.lang = langMap[targetLang] || "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel(); // stop previous speech
    window.speechSynthesis.speak(utterance);
}
