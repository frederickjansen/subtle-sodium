/* tslint:disable:no-console */
import { expect } from 'chai';
import { SubtleSodium as subtle } from '../src/subtle-sodium';

it('randombytes_buf return Uint8Array of correct length', () => {
    const ar = subtle.randombytes_buf(10);
    expect(ar).to.have.lengthOf(10);
    expect(ar).to.be.a('Uint8Array');
});

describe('Secret-key authenticated encryption', () => {
    it('should generate key', (done) => {
        subtle.crypto_secretbox_keygen().then((key) => {
            expect(key).to.be.a('Uint8Array');
            expect(key.byteLength).to.be.equal(32);
            done();
        });
    });

    it('should encrypt data', (done) => {
        const key = new Uint8Array([138, 229, 175, 172, 236, 102, 63, 30, 119, 113, 206, 16, 73, 48, 229, 202,
            29, 187, 226, 128, 160, 247, 185, 103, 136, 70, 30, 234, 99, 95, 103, 153]);
        const nonce = new Uint8Array([3, 88, 45, 79, 119, 213, 202, 86, 92, 110, 8, 217]);
        const result = new Uint8Array([180, 51, 199, 109, 246, 27, 32, 2, 160, 216, 255, 136, 74, 147, 188, 69,
            84, 148, 25, 64, 132, 237, 4, 51, 237, 4, 180, 253]);

        subtle.crypto_secretbox_easy('Test message', nonce, key).then((cipher) => {
            expect(cipher).to.be.deep.equal(result);
            done();
        });
    });

    it('should decrypt data', (done) => {
        const key = new Uint8Array([138, 229, 175, 172, 236, 102, 63, 30, 119, 113, 206, 16, 73, 48, 229, 202,
            29, 187, 226, 128, 160, 247, 185, 103, 136, 70, 30, 234, 99, 95, 103, 153]);
        const nonce = new Uint8Array([3, 88, 45, 79, 119, 213, 202, 86, 92, 110, 8, 217]);
        const cipherText = new Uint8Array([180, 51, 199, 109, 246, 27, 32, 2, 160, 216, 255, 136, 74, 147, 188,
            69, 84, 148, 25, 64, 132, 237, 4, 51, 237, 4, 180, 253]);

        subtle.crypto_secretbox_open_easy(cipherText, nonce, key).then((message) => {
            expect(message).to.be.equal('Test message');
            done();
        });
    });

    it('should encrypt and decrypt data', (done) => {
        subtle.crypto_secretbox_keygen().then((key) => {
            const nonce = subtle.randombytes_buf(subtle.crypto_secretbox_NONCEBYTES);

            subtle.crypto_secretbox_easy('Test message', nonce, key).then((cipher) => {
                subtle.crypto_secretbox_open_easy(cipher, nonce, key).then((message) => {
                    expect(message).to.be.equal('Test message');
                    done();
                });
            });
        });
    });

    it('crypto_secretbox_KEYBYTES is 32', () => {
        expect(subtle.crypto_secretbox_KEYBYTES).to.be.equal(32);
    });

    it('crypto_secretbox_NONCEBYTES is 32', () => {
        expect(subtle.crypto_secretbox_NONCEBYTES).to.be.equal(12);
    });
});
