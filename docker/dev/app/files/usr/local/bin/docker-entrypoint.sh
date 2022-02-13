#!/bin/bash
set -eu

wait-for db:5432

cd /var/app

npm run db:migration:do
npm run dev:container