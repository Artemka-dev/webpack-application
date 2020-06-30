export function createModal(title, content) {
    const modalWind = document.createElement("div")
    modalWind.classList.add("modal")

    const html = `
        <h1>${title}</h1>
        <div class="modal-content">${content}</div>
    `
    modalWind.innerHTML = html

    mui.overlay("on", modalWind)
}