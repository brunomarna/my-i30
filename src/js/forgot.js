document.getElementById('forgot-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reset-email').value;

    
    alert(`A password reset request for ${email} has been simulated. In a production environment, an automated email would be sent. For this demo, please use the GitHub Demo account or contact Bruno.`);
    
    window.location.href = "index.html";
});