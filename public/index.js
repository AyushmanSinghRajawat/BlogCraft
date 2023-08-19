document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const uploadButton = document.getElementById("uploadButton");
  let insertCount=0;
  let newdivCount=1;
  let imgIndex = 0;

  const addImageContainerButton = document.getElementById("addImageContainerButton");
  const contentEditable = document.getElementById("exampleFormControlTextarea1");
      
  addImageContainerButton.addEventListener("click", () => {
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.classList.remove("img1");
    imageContainer.removeAttribute("id");
    const newImageContainer = document.createElement("div");
    newImageContainer.className = "img1 img-container";
    newImageContainer.contentEditable = false;
    newImageContainer.id = "imageContainer";
    newdivCount=newdivCount+1;
    contentEditable.appendChild(newImageContainer);
    for (let i = 0; i < 3; i++) {
      const lineBreak = document.createElement("br");
      contentEditable.appendChild(lineBreak);
    }
    
  });


  uploadButton.addEventListener("click", () => {
    const imageContainer = document.getElementById("imageContainer");
    const file = imageInput.files[0];
    if (file) {
      if(imageContainer.classList.contains("img1")){
        insertCount=insertCount+1;
        if(insertCount==newdivCount){
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageURL = event.target.result;
            const imageElement = document.createElement("img");
            imageElement.src = imageURL;
            imageElement.classList.add("img1", "uploaded-image");
            imageElement.setAttribute("draggable", "true");
            imageElement.setAttribute("data-index", imgIndex++);
            imageContainer.appendChild(imageElement);
            
          
          };

        reader.readAsDataURL(file);
        }
        else{
          insertCount-=1;
        }
    
      }
      
    }
  });
  
  

  // Add event listener for dragging images
  document.addEventListener("dragstart", (event) => {
    if (event.target.classList.contains("img1")) {
      event.dataTransfer.setData("text/plain", event.target.getAttribute("data-index"));
    }
  });

  document.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  document.addEventListener("drop", (event) => {
    event.preventDefault();
    const dataIndex = event.dataTransfer.getData("text/plain");
    const target = document.querySelector(`[data-index="${dataIndex}"]`);
    if (target && event.target.classList.contains("content")) {
      event.target.appendChild(target.cloneNode(true));
      target.remove();
    }
  });

  // Move image functions
  const alignLeftButton = document.getElementById("alignLeftButton");
  const alignRightButton = document.getElementById("alignRightButton");
  const alignCenterButton = document.getElementById("alignCenterButton");
  alignLeftButton.addEventListener("click", () => {
    if (imageContainer) {
      imageContainer.style.textAlign = "left";
    }
  });

  alignRightButton.addEventListener("click", () => {
    if (imageContainer) {
      imageContainer.style.textAlign = "right";
    }
  });

  alignCenterButton.addEventListener("click", () => {
    if (imageContainer) {
      imageContainer.style.textAlign = "center";
    }
  });
  // Resize image functions
  const resizeImage = (factor) => {
    const imageContainer = document.getElementById("imageContainer");
    const selectedImage = imageContainer.querySelector(".img1");
    if (selectedImage) {
      const currentWidth = selectedImage.width;
      const currentHeight = selectedImage.height;
      const newWidth = currentWidth * factor;
      const newHeight = currentHeight * factor;

      selectedImage.style.width = newWidth + "px";
      selectedImage.style.height = newHeight + "px";
    }
  };

  document.getElementById("increaseSize").addEventListener("click", () => {
    resizeImage(1.1); // Increase size by 10%
  });


  document.getElementById("decreaseSize").addEventListener("click", () => {
    resizeImage(0.9); // Decrease size by 10%
  });
  const increaseFontSizeButton = document.getElementById("increaseFontSizeButton");
  const decreaseFontSizeButton = document.getElementById("decreaseFontSizeButton");
  const boldToggleButton=document.getElementById("boldToggleButton");
  let currentFontSize = 16;
  increaseFontSizeButton.addEventListener("click", () => {
    const currentContainer=contentEditable;
    if (currentContainer) {
      const fontSize = window.getComputedStyle(currentContainer).fontSize;
      currentContainer.style.fontSize = parseInt(fontSize) + 2 + "px";
      currentFontSize = parseInt(fontSize) + 2;
    }
  });

  decreaseFontSizeButton.addEventListener("click", () => {
    const currentContainer=contentEditable;
    if (currentContainer) {
      const fontSize = window.getComputedStyle(currentContainer).fontSize;
      currentContainer.style.fontSize = parseInt(fontSize) - 2 + "px";
      currentFontSize = parseInt(fontSize) - 2;
    }
  });
  boldToggleButton.addEventListener("click", () => {
    const currentContainer=contentEditable;
    if (currentContainer) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        const isBold = range.toString().trim() && document.queryCommandState('bold');
  
        if (isBold) {
          span.style.fontWeight = "normal";
        } else {
          span.style.fontWeight = "bold";
        }
  
        span.appendChild(range.extractContents());
        range.insertNode(span);
      }
    }
  });
  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", () => {
    const blogTitle = document.querySelector(".form-control").value; // Get the blog title
    const fontSizeStyle = `font-size: ${currentFontSize}px;`;
    
    const content = `
    <div style="${fontSizeStyle} font-family: sans-serif ;">
      <div style="text-align: center;"><h1 style="text-decoration: underline;">${blogTitle}</h1></div>
      ${contentEditable.innerHTML}
    </div>`;  // Include the title in the content
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "blog_content.html";
    a.click();

    URL.revokeObjectURL(url);
  });
  
});