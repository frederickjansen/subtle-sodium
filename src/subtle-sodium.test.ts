import { SubtleSodium as subtle } from './subtle-sodium';

test('crypto_secretbox_KEYBYTES is 32', () => {
  expect(subtle.crypto_secretbox_KEYBYTES).toBe(32);
});