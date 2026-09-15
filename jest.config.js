export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.(t|j)s$',
  transform: {
    '^.+\\.(j|t)s$': 'ts-jest'
  },
  setupFiles: ['<rootDir>/setup-tests.ts'],
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*/.(t|j)s'],
  coverageDirectory: '../coverage',
}
