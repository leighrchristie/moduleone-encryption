async function decode(blob) {

    const algorithm = {
        name: 'AES-GCM',
        length: 128
    }
    const settings = {
        name: 'AES-GCM',
        iv: new Uint8Array([45,768,542,876,098,754])
    }

    const [encryptedBufferToString, shareableKey] = atob(blob).split("|")
    const ciphertext = new Uint8Array(encryptedBufferToString.match(/[\s\S]/g).map(ch => ch.charCodeAt(0)))
    const key = await crypto.subtle.importKey('jwk', JSON.parse(shareableKey), algorithm, false, ["decrypt"])
    const decrypted = await crypto.subtle.decrypt(settings, key, ciphertext)
    const decodedMessage = new TextDecoder().decode(decrypted)
    console.log(decodedMessage)
}