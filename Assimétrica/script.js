document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        generateKeysBtn: document.getElementById('generateKeysButton'),
        publicKeyOutput: document.getElementById('publicKeyOutput'),
        privateKeyOutput: document.getElementById('privateKeyOutput'),
        encryptBtn: document.getElementById('encryptButton'),
        publicKeyInput: document.getElementById('publicKeyInput'),
        messageToEncrypt: document.getElementById('messageToEncrypt'),
        encryptedMessage: document.getElementById('encryptedMessage'),
        decryptBtn: document.getElementById('decryptButton'),
        privateKeyInput: document.getElementById('privateKeyInput'),
        messageToDecrypt: document.getElementById('messageToDecrypt'),
        decryptedMessage: document.getElementById('decryptedMessage'),
    };

    const handleGenerateKeys = () => {
        const crypt = new JSEncrypt({ default_key_size: 2048 });
        elements.publicKeyOutput.value = 'Gerando...';
        elements.privateKeyOutput.value = 'Gerando...';
        setTimeout(() => {
            elements.publicKeyOutput.value = crypt.getPublicKey();
            elements.privateKeyOutput.value = crypt.getPrivateKey();
        }, 50);
    };

    const handleEncrypt = () => {
        const publicKey = elements.publicKeyInput.value.trim();
        const message = elements.messageToEncrypt.value.trim();
        if (!publicKey || !message) return alert('Forneça a chave pública e a mensagem.');
        
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        const encrypted = encrypt.encrypt(message);
        elements.encryptedMessage.value = encrypted || '';
        if (!encrypted) alert('Erro na criptografia. Verifique a chave pública.');
    };

    const handleDecrypt = () => {
        const privateKey = elements.privateKeyInput.value.trim();
        const encryptedMessage = elements.messageToDecrypt.value.trim();
        if (!privateKey || !encryptedMessage) return alert('Forneça a chave privada e a mensagem.');
        
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);
        const decrypted = decrypt.decrypt(encryptedMessage);
        
        elements.decryptedMessage.textContent = decrypted || 'Falha na descriptografia. Verifique a chave e a mensagem.';
        elements.decryptedMessage.style.color = decrypted ? '#333' : 'red';
    };

    elements.generateKeysBtn.addEventListener('click', handleGenerateKeys);
    elements.encryptBtn.addEventListener('click', handleEncrypt);
    elements.decryptBtn.addEventListener('click', handleDecrypt);
});