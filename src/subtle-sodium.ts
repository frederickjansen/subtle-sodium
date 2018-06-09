export class SubtleSodium {
    readonly crypto_secretbox_KEYBYTES = 32;
    readonly crypto_secretbox_NONCEBYTES = 12;

    constructor() {
        crypto = window.crypto;
    }

    randombytes_buf(length: number) {
        return crypto.getRandomValues(new Uint8Array(length))
    }

    async crypto_secretbox_easy(message: string, nonce: Uint8Array, key) {
        const msUtf8 = new TextEncoder().encode(message);
        const alg = {name: 'AES-GCM', iv: nonce, tagLength: 128};

        return await crypto.subtle.encrypt(alg, key, msUtf8);
    }

    async crypto_secretbox_easy_open(ciphertext: string, nonce: Uint8Array, key) {
        const ctUtf8 = new TextEncoder().encode(ciphertext);
        const alg = {name: 'AES-GCM', iv: nonce, tagLength: 128};

        return await crypto.subtle.decrypt(alg, key, ctUtf8);
    }
}