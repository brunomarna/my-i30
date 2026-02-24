document.getElementById('btn-submit').addEventListener('click', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('input-login').value;
    const password = document.getElementById('input-password').value;
    
    const rememberMe = document.querySelector('input[type="checkbox"]').checked;

    try {
        const response = await fetch('http://127.0.0.1:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            
            if (rememberMe) {
                localStorage.setItem('token', data.token);
            } else {
                sessionStorage.setItem('token', data.token); 
            }
            
            window.location.href = "my-i30.html";
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error("Login failed:", err);
    }
});

document.getElementById('btn-demo').addEventListener('click', async () => {
    const demoEmail = 'demo@github.com';
    const demoPassword = 'i30-demo-password'; 

    try {
        const response = await fetch('http://127.0.0.1:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: demoEmail, password: demoPassword })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = "my-i30.html";
        }
    } catch (err) {
        console.error("Demo login failed:", err);
    }
});