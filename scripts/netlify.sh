#!/usr/bin/env bash

npm i -g pnpm

pnpm recursive install

cd packages/builder

env NODE_ENV=production pnpm run build

cd -
