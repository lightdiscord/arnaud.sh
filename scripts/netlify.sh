#!/usr/bin/env bash

npm i -g pnpm

pnpm recursive install

cd packages/builder

pnpm run build

cd -
