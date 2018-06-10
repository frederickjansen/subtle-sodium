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
            expect(key).to.be.a('CryptoKey');
            expect(key.extractable).to.equal(true);
            done();
        });
    });

    it('crypto_secretbox_KEYBYTES is 32', () => {
        expect(subtle.crypto_secretbox_KEYBYTES).to.be.equal(32);
    });

    it('crypto_secretbox_NONCEBYTES is 32', () => {
        expect(subtle.crypto_secretbox_NONCEBYTES).to.be.equal(12);
    });
});
