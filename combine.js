const viewBtn = document.querySelector(".view-modal"), 
    popup = document.querySelector(".popup"),
    close = popup.querySelector(".close"),
    field = popup.querySelector(".field"),
    input = field.querySelector("input"),
    copy = field.querySelector("button"),
    socialIcons = document.querySelector(".icons"),
    videoPopup = document.getElementById("videoPopup"),
    recordedVideo = document.getElementById("recordedVideo"),
    closeBtn = document.querySelector(".close-btn"),
    btn = document.querySelector(".record-btn");

let mediaRecorder, chunks = [], stream;

// Show popup with animation
viewBtn.onclick = () => {
    popup.classList.add("show");

    // Animate the social icons separately
    socialIcons.style.opacity = "0";
    socialIcons.style.transform = "translateY(30px)";

    setTimeout(() => {
        socialIcons.style.transition = "opacity 0.4s ease-in-out, transform 0.4s ease-in-out";
        socialIcons.style.opacity = "1";
        socialIcons.style.transform = "translateY(0)";
    }, 200);
};

// Close popup with animation
close.onclick = () => {
    popup.classList.remove("show");
    socialIcons.style.transition = "none";
    socialIcons.style.opacity = "0";
    socialIcons.style.transform = "translateY(30px)";
};

// Copy link functionality
copy.onclick = () => {
    input.select();
    document.execCommand("copy");
    field.classList.add("active");
    copy.innerText = "Copied";

    setTimeout(() => {
        window.getSelection().removeAllRanges();
        field.classList.remove("active");
        copy.innerText = "Copy";
    }, 3000);
};

// Start/Stop screen recording
btn.addEventListener("click", async function () {
    if (btn.textContent === "Start Recording") {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

        const mime = MediaRecorder.isTypeSupported("video/webm codecs=vp9") ? "video/webm codecs=vp9" : "video/webm";
        mediaRecorder = new MediaRecorder(stream, { mimeType: mime });

        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
        };

        mediaRecorder.onstop = function () {
            let blob = new Blob(chunks, { type: chunks[0].type });
            let url = URL.createObjectURL(blob);
            recordedVideo.src = url;
            videoPopup.style.display = "block";

            let a = document.createElement('a');
            a.href = url;
            a.download = 'screen_recording.webm';
            a.click();
            chunks = [];
        };

        mediaRecorder.start();
        btn.textContent = "STOP";
    } else {
        mediaRecorder.stop();
        btn.textContent = "Start Recording";
    }
});
closeBtn.addEventListener("click", function () {
    videoPopup.style.display = "none";
});
