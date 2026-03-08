document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const usernameInput = document.querySelector('input[type="text"]').value;
    const passwordInput = document.querySelector('input[type="password"]').value;
    const signInBtn = event.target.querySelector('button');

    const validUsername = "admin";
    const validPassword = "admin123";

    const originalBtnText = signInBtn.innerText;
    signInBtn.innerHTML = '<span class="loading loading-spinner"></span> Signing In...';
    signInBtn.disabled = true;

    setTimeout(() => {
        if (usernameInput === validUsername && passwordInput === validPassword) {
            localStorage.setItem('userLoggedIn', 'true');
            window.location.href = "dashboard.html";
        } else {
            alert("Your username or password is incorrect. Please try again.");
            signInBtn.innerHTML = originalBtnText;
            signInBtn.disabled = false;
        }
    }, 1000);
});