export function getAuthForm() {
    return `
    <form class="mui-form" id="auth-form">
        <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="email" required autocomplete="off">
            <label for="email">Почта</label>
        </div>

        <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password" required>
            <label for="password">Пароль</label>
        </div>

        <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">Войти</button>
    </form>
    `
}

// artem@mail.ru qwerty123

export async function authWithEmailAndPassword(email, password) {
    const API = "AIzaSyD8ti7BlTimoOZ9uHtIMPPbSq4Eef2C_TQ"
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`, {
        method: "POST",
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {"Content-Type": "application/json"}
    })

    const json = await response.json()

    return json.idToken
}