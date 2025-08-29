document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message');
    const encryptKeyInput = document.getElementById('encryptKey');
    const encryptButton = document.getElementById('encryptButton');
    const encryptedResultDiv = document.getElementById('encryptedMessage');
    const encryptedInput = document.getElementById('encryptedInput');
    const decryptKeyInput = document.getElementById('decryptKey');
    const decryptButton = document.getElementById('decryptButton');
    const decryptedResultDiv = document.getElementById('decryptedMessage');
    const copyButtons = document.querySelectorAll('.copy-button');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    function updateResultBox(element, text, isError = false) {
        element.textContent = text;
        element.style.color = isError ? 'red' : '#333';
    }
    encryptButton.addEventListener('click', () => {
        const message = messageInput.value;
        const key = encryptKeyInput.value;
        if (!message || !key) {
            updateResultBox(encryptedResultDiv, 'Por favor, insira a mensagem e a chave.', true);
            return;
        }
        try {
            const encrypted = CryptoJS.AES.encrypt(message, key).toString();
            updateResultBox(encryptedResultDiv, encrypted);
            encryptedInput.value = encrypted; 
        } catch (error) {
            console.error("Erro na criptografia:", error);
            updateResultBox(encryptedResultDiv, 'Ocorreu um erro durante a criptografia.', true);
        }
    });
    decryptButton.addEventListener('click', () => {
        const encryptedText = encryptedInput.value;
        const key = decryptKeyInput.value;

        if (!encryptedText || !key) {
            updateResultBox(decryptedResultDiv, 'Por favor, insira a mensagem criptografada e a chave.', true);
            return;
        }
        try {
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, key);
            const originalMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

            if (originalMessage) {
                updateResultBox(decryptedResultDiv, originalMessage);
            } else {
                updateResultBox(decryptedResultDiv, 'Falha ao descriptografar. Verifique a chave e a mensagem.', true);
            }
        } catch (error) {
            console.error("Erro na descriptografia:", error);
            updateResultBox(decryptedResultDiv, 'Erro. Verifique se a mensagem está no formato Base64 correto.', true);
        }
    });
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.target.dataset.target;
            const targetElement = document.getElementById(targetId);
            const textToCopy = targetElement.textContent;

            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = button.textContent;
                    button.textContent = 'Copiado!';
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Falha ao copiar:', err);
                });
            }
        });
    });
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const passwordInput = e.target.previousElementSibling;
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            e.target.textContent = isPassword ? '🙈' : '👁️';
        });
    });
});