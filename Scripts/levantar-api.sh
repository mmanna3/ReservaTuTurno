#!/bin/bash
ME_LLAMARON_DESDE=$(pwd)
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR
dotnet run --project ../ReservaTuTurnoApi/Api/Api.csproj
cd $ME_LLAMARON_DESDE