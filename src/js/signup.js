document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault(); 

    
    alert("Public registration is currently disabled to prevent database spam. Please use the 'View Demo Account' button on the login page to explore the app!");
    
    
    window.location.href = "index.html";
});