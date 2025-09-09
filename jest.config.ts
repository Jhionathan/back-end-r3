import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  transform: { '^.+\\.ts$': 'ts-jest' },
  moduleNameMapper: {
    '@modules/(.*)$': ['<rootDir>/src/modules/$1'],
    '@common/(.*)$': ['<rootDir>/src/common/$1']
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts', '**/*.e2e.ts'],
  coveragePathIgnorePatterns: [
    'logging.interceptor.ts',
    '.sql.ts',
    '.enum.ts',
    '.module.ts',
    '.doc.ts',
    '.constant.ts',
    '.repository.ts',
    '.e2e.ts',
    '.test.ts',
    '.entity.ts',
    'dtos/request/*',
    'contracts/*',
    'migrations/*',
    'database/connections/*'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

export default config;
