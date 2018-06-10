import { expect } from 'chai';
import { SubtleSodium as subtle } from '../src/subtle-sodium';

it('randombytes_buf return Uint8Array of correct length', () => {
    const ar = subtle.randombytes_buf(10);
    expect(ar).to.have.lengthOf(10);
    expect(ar).to.be.a('Uint8Array');
});

it('crypto_secretbox_KEYBYTES is 32', () => {
    expect(subtle.crypto_secretbox_KEYBYTES).to.be.equal(32);
});
