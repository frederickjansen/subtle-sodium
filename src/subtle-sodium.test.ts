import { expect } from 'chai';
import { SubtleSodium as subtle } from '../src/subtle-sodium';

describe('HelloComponent', () => {
    it('crypto_secretbox_KEYBYTES is 32', () => {
        expect(subtle.crypto_secretbox_KEYBYTES).to.be.equal(32);
    });
});
