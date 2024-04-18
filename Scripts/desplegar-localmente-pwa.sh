#!/bin/bash
cd ..
cd ReservaTuTurnoPWA
yarn
yarn build
cp -rf ./dist/. ./../ReservaTuTurnoApi/Api/wwwroot