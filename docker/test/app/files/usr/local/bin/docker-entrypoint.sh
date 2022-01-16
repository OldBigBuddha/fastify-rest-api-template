#!/bin/bash
set -eu

wait-for db:5432

cd /var/app

npm run test