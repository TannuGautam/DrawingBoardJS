let request = indexedDB.open("Drawing",1);

let db;

request.onsuccess = function(e)
{
    db = request.result;
}

request.onerror = function(e)
{
    console.log("error");
}

request.onupgradeneeded = function(e)
{
    db = request.result;
    db.createObjectStore("drawingsStore", { keyPath: "myID"});
    
}

function addMediaToGallery(data, type)
{
    //transaction
    let tx = db.transaction("drawingsStore","readwrite");

    let gallery = tx.objectStore("drawingsStore");

    gallery.add({ myID: Date.now(), type, media:data});

}

function viewMedia()
{
    let body = document.querySelector("body");

    let tx = db.transaction("drawingsStore","readonly");

    let gallery = tx.objectStore("drawingsStore");

    let req = gallery.openCursor();

    req.onsuccess = function(e)
    {
        let cursor = req.result;

        if(cursor)
        {
            if(cursor.value.type == "img")
            {
                let imgContainer = document.createElement("div");

                imgContainer.setAttribute("data-mId",cursor.value.myID);

                imgContainer.classList.add("gallery-img-container");

                let img = document.createElement("img");

                img.src = cursor.value.media;

                imgContainer.appendChild(img);

                let deleteBtn = document.createElement("button");

                deleteBtn.classList.add("gallery-delete-button");

                deleteBtn.innerText = "Delete";

                deleteBtn.addEventListener("click", deleteBtnHandler);

                let downloadBtn = document.createElement("button");

                downloadBtn.classList.add("gallery-download-button");

                downloadBtn.innerText = "Download";

                downloadBtn.addEventListener("click", downloadBtnHandler);

                imgContainer.appendChild(deleteBtn);

                imgContainer.appendChild(downloadBtn);

                body.appendChild(imgContainer);
            }

            cursor.continue();
        }
        

    } 
}

function deleteMediaFromGallery(myID)
{
    let tx = db.transaction("drawingsStore","readwrite");

    let gallery = tx.objectStore("drawingsStore");

    console.log(myID);

    gallery.delete(Number(myID));

}

function deleteBtnHandler(e)
{
    let mId = e.currentTarget.parentNode.getAttribute("data-mId");

    deleteMediaFromGallery(mId);

    e.currentTarget.parentNode.remove();

}

function downloadBtnHandler(e)
{
    let a = document.createElement("a");

    a.href = e.currentTarget.parentNode.children[0].src;

    a.download = "image.png";

    a.click();

    a.remove();
}