let savedSecrets = [];
let wrongAttempts = 0;

function addSecret() {
    let secretTitle = document.getElementById("newSecret").value;
    let secretCode = document.getElementById("newCode").value;
    let secretMessage = document.getElementById("newSecretMessage").value;

    if (secretTitle && secretCode && secretMessage) {
        savedSecrets.push({ title: secretTitle, code: secretCode, message: secretMessage });
        updateSecretsList();
        document.getElementById("newSecret").value = "";
        document.getElementById("newCode").value = "";
        document.getElementById("newSecretMessage").value = "";
    }
}

function updateSecretsList() {
    let list = document.getElementById("secretsList");
    list.innerHTML = "";
    savedSecrets.forEach((item, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = item.title;
        list.appendChild(option);
    });
}

function unlockSafe() {
    let enteredCode = document.getElementById("codeInput").value;
    let selectedIndex = document.getElementById("secretsList").value;
    let lockIcon = document.getElementById("lockIcon");
    let unlockSound = document.getElementById("unlockSound");

    if (selectedIndex !== "" && savedSecrets[selectedIndex].code === enteredCode) {
        unlockSound.play();
        lockIcon.classList.add("unlock-animation");

        // Wait for the unlock sound to complete before revealing the message
        unlockSound.onended = function () {
            lockIcon.classList.remove("unlock-animation");
            document.getElementById("message").classList.remove("hidden");
            document.getElementById("secretMessage").textContent = "🔓 Secret: " + savedSecrets[selectedIndex].message;
            document.getElementById("secretMessage").style.display = "block";

            setTimeout(() => {
                document.getElementById("message").classList.add("hidden");
            }, 3000);
            wrongAttempts = 0;
        };

    } else {
        wrongAttempts++;
        document.getElementById("alertSound").play();
        if (wrongAttempts >= 3) {
            triggerAlarm();
        }
    }
}

function triggerAlarm() {
    let alarm = document.getElementById("alarm");
    alarm.style.display = "block";
    let blinkCount = 0;

    let blink = setInterval(() => {
        alarm.style.opacity = alarm.style.opacity == "0" ? "1" : "0";
        blinkCount++;
        if (blinkCount >= 6) {
            clearInterval(blink);
            alarm.style.display = "none";
            wrongAttempts = 0;
        }
    }, 500);
}
