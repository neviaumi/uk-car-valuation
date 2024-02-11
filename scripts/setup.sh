#! /usr/bin/env bash

set -e

CURRENT_BRANCH=$(git branch --show-current)
NVM_SOURCE="$NVM_DIR/nvm.sh"
echo "Current branch is $CURRENT_BRANCH"
if [ -f "$NVM_SOURCE" ]
then
  set +e
  source "$NVM_SOURCE"
  nvm install
  set -e
fi

if [ -z "$CI" ]
then
  echo "Not in CI, installing dependencies with npm install"
  npm install
else
  echo "Run in CI, installing dependencies with npm ci"
  npm ci
fi

npx playwright install
