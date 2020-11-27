module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['src/core/rooms.ts'],
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
};
