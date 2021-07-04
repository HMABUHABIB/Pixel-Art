/**https://www.npmjs.com/package/dom-to-image */


const gridSizeBtn = document.getElementById("gridSizeBtn");
const notification = document.getElementById("notification");
const changeGridAgreeBtn = document.getElementById("changeGridAgree");
const changeGridCancelBtn = document.getElementById("changeGridCancel");
const canvasPanel = document.getElementById("canvas");
const downloadBtn = document.getElementById("downloadBtn");



let gridSizeState = 8;
let selectedColor = "white";
let canvasHtmlContent = "";
let canvasIsClean = true;
createNewCanvas(8)


gridSizeBtn.addEventListener("click", function () {
   notification.classList.toggle('notificationShow')
});

changeGridAgree.addEventListener("click", function () {
gridSizeState = document.getElementById("gridSizeState").value;
  createNewCanvas(gridSizeState);
  notification.classList.toggle('notificationShow')
});

changeGridCancel.addEventListener("click", function () {
    notification.classList.toggle('notificationShow')

});


document.body.addEventListener(
    "click",
    function (event) {
      if (event.target.className === "color-element") {
        selectedColor = event.target.style["background-color"];
      } else if (event.target.className === "canvas-cell") {
        event.target.style["background-color"] = selectedColor;
        canvasIsClean = false;
      }
    },
    false
  );

downloadBtn.addEventListener("click", function () {

if(!canvasIsClean){
    let downloadType = document.querySelector('input[name="downloadType"]:checked').value;
    const node = document.getElementById("canvas");
    if(downloadType=='PNG'){
        domtoimage
        .toPng(node)
        .then(function (dataUrl) {
          let img = new Image();
          img.src = dataUrl;
          downloadURI(dataUrl, "pixel-art-png.png")

        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    }else{
        domtoimage.toJpeg(node, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'pixel-art-jpeg.jpeg';
            link.href = dataUrl;
            link.click();
        });
    }
}else{
    alert('The canvas is empty')
}
 

});

function downloadURI(uri, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function createNewCanvas(gridSize) {
    canvasHtmlContent = "";
  let row = "";
  for (i = 0; i < gridSize; i++) {
    for (j = 0; j < gridSize; j++) {
      row = row + `<td class="canvas-cell"></td>`;
    }
    canvasHtmlContent =
      canvasHtmlContent +
      `<tr style="height: ${32 / gridSizeState}rem">${row}</tr>`;
    row = "";
  }

  canvasPanel.innerHTML = canvasHtmlContent;
}

