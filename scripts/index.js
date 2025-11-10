import { renderUserInfo, renderProjects } from "../services/indexdomservice.js";
import { renderTechnologies } from "../services/domservice.js";

document.addEventListener("DOMContentLoaded", () => {
    fetch("mock/user.json")
    .then(response => response.json())
    .then(data => {

        renderUserInfo(data);
        renderTechnologies(data.techs);
        renderProjects(data.projects);

    })
    .catch(error => console.log("Error al obtener datos: ", error));
})