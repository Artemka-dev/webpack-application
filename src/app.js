import css from "./static/style.css"
import { Question } from "./question"
import { createModal } from "./utils"
import { getAuthForm, authWithEmailAndPassword } from "./auth"

const form = document.getElementById("form")
const input = form.querySelector("#question-input")
const submitButton = form.querySelector("#submit")
const modal = document.getElementById("modal-btn")


window.addEventListener("load", Question.renderList)
form.addEventListener("submit", submitFormHandler)
input.addEventListener("input", () => {
    submitButton.disabled = !(input.value.length >= 10)
})
modal.addEventListener("click", openModal)

async function submitFormHandler(event) {
    event.preventDefault()

    const question = {
        text: input.value.trim(),
        date: new Date().toJSON()
    }

    submitButton.disabled = true

    // async request to server to save question
    await Question.create(question)

    input.value = ""
    input.className = ""

    submitButton.disabled = false
}

function openModal() {
    createModal("Авторизация", getAuthForm())

    document.getElementById("auth-form").addEventListener("submit", authFormHandler, {once: true})
}

async function authFormHandler(event) {
    event.preventDefault()

    const btn = event.target.querySelector("button")
    const email = event.target.querySelector("#email").value
    const password = event.target.querySelector("#password").value

    btn.disabled = true
    
    const token = await authWithEmailAndPassword(email, password) 
    const content = await Question.fetchData(token)

    btn.disabled = false

    renderModalWindow(content)
}

function renderModalWindow(content) {
    if (typeof content === 'string') {
        createModal("Ошибка", content)
    } else {
        createModal("Список вопросов", Question.listToHTML(content))
    }
}
