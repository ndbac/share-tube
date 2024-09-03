const assetsKey = '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$'

const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'config/tests',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    [assetsKey]: 'ts-jest',
  },
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    [assetsKey]: 'ts-jest',
    '\\.svg$': 'ts-jest',
  },
}

export default config
