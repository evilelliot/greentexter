document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
  
  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  
    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }
  
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }
  
    thumbnailElement.dataset.label = file.name;
  
    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onload = (file) => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        var image = new Image();
        image.src = file.target.result;
    
        image.onload = function() {
            // access image size here 
            var b = document.querySelector(".drop-zone");
            var t = document.querySelector(".drop-zone__thumb");
            var w_container = document.getElementById("greentext_full").offsetWidth;
            var h_container = document.getElementById("greentext_full").offsetHeight;

            var aspect_ratio = this.height / this.width;
            console.log(aspect_ratio);
            var _width  = w_container / 4;
            var _height = aspect_ratio * _width;
            b.setAttribute("style", "max-width:" + _width + "px; height: " + _height + "px; border: none;");
            t.removeAttribute("data-label");
            console.log(this.width);
            console.log(this.height);
        };
    
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }
  