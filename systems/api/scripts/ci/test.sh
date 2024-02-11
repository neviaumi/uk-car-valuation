#!/bin/sh

set -ex
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
npm run build
npx eslint -c eslint.config.mjs .
npx tsc
npm run test:ci