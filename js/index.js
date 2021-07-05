/** Select the Element by ID to be able to update the html page */

const gridSizeBtn = document.getElementById("gridSizeBtn"); // Change grid size  of the canvas
const notification = document.getElementById("notification"); // Show the notification to the user before submitting the changes
const changeGridAgreeBtn = document.getElementById("changeGridAgree"); //Save the grid size change of the canvas
const changeGridCancelBtn = document.getElementById("changeGridCancel"); //Cancel grid size change of the canvas
const canvasPanel = document.getElementById("canvas"); //Used to update the canvas
const downloadBtn = document.getElementById("downloadBtn"); //Used to download the canvas as img


let gridSizeState = 8; // The default grid size of the canvas
let selectedColor = "white"; // The default color
let canvasHtmlContent = ""; // The default canvas HTML Content
let canvasIsClean = true; // To know if the canvas is not used yet
createNewCanvas(8) //Generate the default grid size of the canvas with 8*8 


//EventListener to show notification to the user and ask to accept the changes for the grid size.
gridSizeBtn.addEventListener("click", function () {
   notification.classList.toggle('notificationShow')
});

/*EventListener to submit the changes for the grid size after the user agree, 
Then calling createNewCanvas(new grid size).
After that hide the notification message.
*/

changeGridAgree.addEventListener("click", function () {
gridSizeState = document.getElementById("gridSizeState").value;
  createNewCanvas(gridSizeState);
  notification.classList.toggle('notificationShow')
});

// Hide the notification message when the user click cancel for changing the grid size.
changeGridCancel.addEventListener("click", function () {
    notification.classList.toggle('notificationShow')

});

/*
EventListener with if condition to check:
1- if the clicked element has className color-element ==> change the painting color to the element color.
2- if the clicked element has className canvas-cell ==> change the cell color to the painting color ==> then chnage canvasIsClean to false.
*/

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

/*
EventListener on click for downloadBtn will run like below:
1- check if canvasIsClean if (true) ==> show alert('The canvas is empty') 
2- if (false) ==> check the downloadType if it is PNG or Jpeg then run the function to download the img 
3- dom-to-image used to download any HTML element from the page after selecting that element 
*/

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

/*
used to download the img then remove it from dom.
*/
function downloadURI(uri, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

/*
Used to create New Canvas and input is the size of the grid.
*/

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

