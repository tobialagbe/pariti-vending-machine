module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
      'src/modules/**/tests/*.{ts,tsx}',
      '!**/node_modules/**',
      '!**/dist/**',
    ],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  };
  