import { renderUserInfo, renderProjects } from "../services/indexdomservice.js";
import { renderTechnologies } from "../services/domservice.js";

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://127.0.0.1:8000/portfolio")
    .then(response => response.json())
    .then(data => {

        renderUserInfo(data);
        renderTechnologies(data.techs);
        renderProjects(data.projects);

    })
    .catch(error => console.log("Error al obtener datos: ", error));
})

document.getElementById("project-container").addEventListener("click", (e) =>{
    let item = e.target.closest(".project-item");
    if(!item) return;

    let id = item.dataset.projectId;
    window.location.href = `project.html?id=${id}`;
});