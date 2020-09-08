// Coverage config file
module.exports = {
  all: true,
  'check-coverage': true,
  include: ['src/**/*.js'],
  reporter: ['html'],
  'report-dir': './coverage',
  'temp-dir': './coverage/.temp-nyc-output',
  branches: 80,
  lines: 80,
  functions: 80,
  statements: 80,
};
