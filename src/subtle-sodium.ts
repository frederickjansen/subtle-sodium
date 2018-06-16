export class SubtleSodium {
    public static readonly crypto_secretbox_KEYBYTES = 32;
    public static readonly crypto_secretbox_NONCEBYTES = 12;

    public static randombytes_buf(length: number): Uint8Array {
        return window.crypto.getRandomValues(new Uint8Array(length)) as Uint8Array;
    }

    public static from_hex(hex: string): Uint8Array {
        return new Uint8Array(hex.match(/.{2}/g).map((b) => parseInt(b, 16)));
    }

    public static to_hex(uint8: Uint8Array): string {
        return Array.from(uint8).map((b) => b.toString(16).padStart(2, '0')).join('');
    }

    public static async crypto_secretbox_keygen(): Promise<Uint8Array> {
        const alg = {name: 'AES-GCM', length: SubtleSodium.crypto_secretbox_KEYBYTES * 8};
        // At least one keyUsage has to be provided, even though it will not be used
        const cryptoKey = await window.crypto.subtle.generateKey(alg, true, ['encrypt']);
        const key = await window.crypto.subtle.exportKey('raw', cryptoKey);

        return new Uint8Array(key);
    }

    public static async crypto_secretbox_easy(message: string, nonce: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        const msUtf8 = new TextEncoder().encode(message);
        const alg = {name: 'AES-GCM', iv: nonce, tagLength: 128};
        const importedKey = await window.crypto.subtle.importKey('raw', key, 'AES-GCM', true, ['encrypt']);
        const buffer = await window.crypto.subtle.encrypt(alg, importedKey, msUtf8);

        return new Uint8Array(buffer);
    }

    public static async crypto_secretbox_open_easy(ciphertext: Uint8Array, nonce: Uint8Array, key: Uint8Array): Promise<string> {
        const alg = {name: 'AES-GCM', iv: nonce, tagLength: 128};
        const importedKey = await window.crypto.subtle.importKey('raw', key, 'AES-GCM', true, ['decrypt']);
        const buffer = await window.crypto.subtle.decrypt(alg, importedKey, ciphertext);

        return new TextDecoder().decode(buffer);
    }
}
