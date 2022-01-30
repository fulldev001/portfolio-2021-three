#!/bin/bash

# exit on errors
set -e

# install wordpress and plugins
composer install

# link valet to the public folder
cd dist
valet link portfolio-2021-three
cd ..
valet secure portfolio-2021-three
valet db create portfolio-2021-three

# start developing
# npm run dev
