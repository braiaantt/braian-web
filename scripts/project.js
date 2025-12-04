import { loadConfig } from "./config.js";
import { setText, fillList, renderTechnologies } from "../services/domservice.js";

//------ Gallery state ------
let galleryImages = [];
let currentIndex = 0;

const imgElement = document.getElementById("image");
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");

function loadGalleryImages(paths, apiBaseUrl) {
    if(!paths || paths.length === 0) return;

    galleryImages = paths.map(path => apiBaseUrl + path);

    currentIndex = 0;
    updateGalleryImage();
}


function updateGalleryImage() {
    imgElement.src = galleryImages[currentIndex];
}

nextBtn.addEventListener("click", () => {
    if (galleryImages.length === 0) return;

    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateGalleryImage();
});

prevBtn.addEventListener("click", () => {
    if (galleryImages.length === 0) return;

    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
});

//------ DOM Initialization ------
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id")

document.addEventListener("DOMContentLoaded", async () => {

    const config = await loadConfig();
    const API = config.API_BASE_URL;

    fetch(`${API}/project/${projectId}`)
    .then(response => response.json())
    .then(data =>{

        const featStrings = data.feats.map(f => f.feat);
        const infoStrings = data.technical_info.map(i => i.info);

        setText("project-name", data.name);
        setText("about-text", data.big_about);
        fillList("features-list", featStrings);
        renderTechnologies(data.techs);
        fillList("tech-info-list", infoStrings);
        setText("user-comment", data.user_comment);
        loadGalleryImages(data.img_paths, API);

    })
    .catch(error => console.log("Error al obtener los datos: ", error));
})