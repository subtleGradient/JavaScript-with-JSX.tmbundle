#!/usr/bin/env bash -l
cd "$(dirname "$0")"

babel --watch --out-dir ./build ./src
