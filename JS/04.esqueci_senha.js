document.addEventListener("DOMContentLoaded", () => {
    
    const recoverForm = document.getElementById("recoverForm");

    recoverForm.addEventListener("submit", (event) => {
        // Evita que a página recarregue ao clicar no botão
        event.preventDefault(); 
        
        // Pega o e-mail digitado
        const email = document.getElementById("email").value;

        // Simulando envio para o backend
        console.log("Solicitação de recuperação de senha para:", email);
        
        // Feedback visual para o usuário
        alert(`As instruções de recuperação foram enviadas para: ${email}\nPor favor, verifique sua caixa de entrada e pasta de spam.`);
        
        // Redireciona o usuário de volta para a tela de login
        window.location.href = "02.tela_de_login.html";
    });
});