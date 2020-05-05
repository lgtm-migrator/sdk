// Coverage config file
module.exports = {
  all: true,
  'check-coverage': true,
  include: ['src/**/*.js'],
  reporter: ['html'],
  'report-dir': './coverage',
  'temp-dir': './coverage/.temp-nyc-output',
  branches: 50,
  lines: 50,
  functions: 50,
  statements: 50,
};
