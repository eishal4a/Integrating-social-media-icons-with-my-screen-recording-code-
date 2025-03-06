let btn = document.querySelector(".record-btn")
        let videoPopup = document.getElementById("videoPopup")
        let recordedVideo = document.getElementById("recordedVideo")
        let closeBtn = document.querySelector(".close-btn")
        let mediaRecorder
        let chunks = []
        let stream
        
        btn.addEventListener("click", async function () {
            if (btn.textContent === "Start Recording") {
                stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
                
                const mime = MediaRecorder.isTypeSupported("video/webm codecs=vp9") ? "video/webm codecs=vp9" : "video/webm"
                mediaRecorder = new MediaRecorder(stream, { mimeType: mime })
                
                mediaRecorder.ondataavailable = function (e) {
                    chunks.push(e.data)
                }
                
                mediaRecorder.onstop = function () {
                    let blob = new Blob(chunks, { type: chunks[0].type })
                    let url = URL.createObjectURL(blob)
                    recordedVideo.src = url
                    videoPopup.style.display = "block"
                    let a = document.createElement('a')
                    a.href = url
                    a.download = 'screen_recording.webm'
                    a.click()
                    chunks = []
                }
                
                mediaRecorder.start()
                btn.textContent = "STOP"
            } else {
                mediaRecorder.stop()
                btn.textContent = "Start Recording"
            }
        })
        
        closeBtn.addEventListener("click", function () {
            videoPopup.style.display = "none"
        })
        const viewBtn = document.querySelector(".view-modal"), 
    popup = document.querySelector(".popup"),
    close = popup.querySelector(".close"),
    field = popup.querySelector(".field"),
    input = field.querySelector("input"),
    copy = field.querySelector("button");

viewBtn.onclick = () => {
    popup.classList.add("show");
};

close.onclick = () => {
    popup.classList.remove("show");
};

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