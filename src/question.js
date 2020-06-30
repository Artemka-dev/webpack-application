export class Question {
    static async create(question) {
        const response = await fetch("https://questions-app-2c2fb.firebaseio.com/questions.json", {
            method: "POST",
            body: JSON.stringify(question),
            headers: {"Content-Type": "application/json"}
        }) // отправляем запрос в бд

        const json = await response.json() // получаем json
        question.id = json.name // создаем id у вопроса со значением id из бд

        addToLocalStorage(question) // добавляем все в localstorage 
        Question.renderList()
    }

    static renderList() {
        const list = getQuestionsFormLocalStorage()

        const html = list.length ? list.map(toCard).join('') : `<div class="mui--text-headline">Вопросов пока нет</div>`
    
        const element = document.getElementById("list")
        element.innerHTML = html
    }

    static async fetchData(token) {
        if (!token) {
            return "<p class='error'>У вас нет токена</p>"
        } 
        const response = await fetch(`https://questions-app-2c2fb.firebaseio.com/questions.json?auth=${token}`)
        const questions = await response.json()

        if (questions && questions.error) {
            return `<p class='error'>${questions.error}</p>`
        } else {
            return questions ? Object.keys(questions).map(key => ({
                ...questions[key],
                id: key
            })) : []
            
        }        
    }

    static listToHTML(questions) {
        return questions.length 
            ? `<ol>${questions.map(el => `<li>${el.text}</li>`).join('')}</ol>`
            : `<p>Вопросов пока нет</p>`
    }

}

function addToLocalStorage(question) {
    const allQuestions = getQuestionsFormLocalStorage()
    allQuestions.push(question)

    localStorage.setItem("questions", JSON.stringify(allQuestions))
}

function getQuestionsFormLocalStorage() {
    return JSON.parse(localStorage.getItem("questions") || "[]")
}

function toCard(question) {
    return `
    <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>
        ${question.text}
    </div>
    <br/>

    `
}