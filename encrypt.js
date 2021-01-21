async function blob() {
    const algorithm = {
        name: 'AES-GCM',
        length: 128
    }
    const settings = {
        name: 'AES-GCM',
        iv: new Uint8Array([45,768,542,876,098,754])
    }
    const key = await crypto.subtle.generateKey(algorithm, true, ["encrypt", "decrypt"])
    const shareableKey = await crypto.subtle.exportKey('jwk', key)
    const msg = "We like to read unicode characters"
    const toEncode = new TextEncoder().encode(msg)
    const ciphertext = await crypto.subtle.encrypt(settings, key, toEncode)
    const encryptedBufferToString = Array
        .from(new Uint8Array(ciphertext))
        .map(byte => String.fromCharCode(byte)).join('')
    const toTransfer = btoa(encryptedBufferToString + "|" + JSON.stringify(shareableKey))
    console.log(toTransfer)
}