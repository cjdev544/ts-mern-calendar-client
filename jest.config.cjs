// eslint-disable-next-line no-undef
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '!**/fixtures/*.[jt]s?(x)',
  ],
  setupFiles: ['./jest.setup.js'],
}
