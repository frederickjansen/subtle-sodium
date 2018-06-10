export class SubtleSodium {
    public static readonly crypto_secretbox_KEYBYTES = 32;
    public static readonly crypto_secretbox_NONCEBYTES = 12;

    public static randombytes_buf(length: number) {
        return window.crypto.getRandomValues(new Uint8Array(length));
    }

    public static async crypto_secretbox_keygen() {
        const alg = {name: 'AES-GCM', length: SubtleSodium.crypto_secretbox_KEYBYTES * 8};

        return await window.crypto.subtle.generateKey(alg, true, ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']);
    }

    public static async crypto_secretbox_easy(message: string, nonce: Uint8Array, key: CryptoKey) {
        const msUtf8 = new TextEncoder().encode(message);
        const alg = {name: 'AES-GCM', iv: nonce, tagLength: 128};

        return await window.crypto.subtle.encrypt(alg, key, msUtf8);
    }

    public static async crypto_secretbox_easy_open(ciphertext: string, nonce: Uint8Array, key: CryptoKey) {
        const ctUtf8 = new TextEncoder().encode(ciphertext);
        const alg = {name: 'AES-GCM', iv: nonce, tagLength: 128};

        return await window.crypto.subtle.decrypt(alg, key, ctUtf8);
    }
}
