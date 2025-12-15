import { loadConfig } from "./config.js";
import { renderUserInfo, renderProjects } from "../services/indexdomservice.js";
import { renderTechnologies } from "../services/domservice.js";

document.addEventListener("DOMContentLoaded", async () => {

    const config = await loadConfig();
    const API = config.API_BASE_URL

    fetch(`${API}/portfolio`)
    .then(response => response.json())
    .then(data => {

        renderUserInfo(data, API);
        renderTechnologies(data.techs, API);
        renderProjects(data.projects, API);

    })
    .catch(error => console.log("Error al obtener datos: ", error));

    fetch("partials/header.html")
        .then(res => res.text())
        .then(header => {
            document.getElementById("header-container").innerHTML = header;
        })
})

document.getElementById("project-container").addEventListener("click", (e) =>{
    let item = e.target.closest(".project-item");
    if(!item) return;

    let id = item.dataset.projectId;
    window.location.href = `project.html?id=${id}`;
});