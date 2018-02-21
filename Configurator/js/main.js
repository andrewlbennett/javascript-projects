// Elements
const patches = document.querySelector('.patches');
const patch = patches.querySelectorAll('.patch');
const previewImage = document.querySelector('.preview-image');
const firstPatchUrl = patch[0].children[0].dataset.preview;

// Functions
function showPattern() {
    const imgSrc = this.children[0].dataset.preview; //Get this patches source
    previewImage.src=imgSrc; //Set preview image with new source
}

// Set preview image with first patch style
previewImage.src=firstPatchUrl;

// Event Listeners
patch.forEach(patch => patch.addEventListener('click', showPattern)); //Add event listener to each patch