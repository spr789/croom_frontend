// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
};
