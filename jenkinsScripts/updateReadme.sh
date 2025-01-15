#!/bin/bash

# Ruta del README
README_FILE="README.md"

# Verificar el parámetro de entrada
if [ "$1" == "success" ]; then
  BADGE="![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)"
else
  BADGE="![Failure](https://img.shields.io/badge/test-failure-red)"
fi

# Actualizar el README
if grep -q "RESULTADO DE LOS ÚLTIMOS TESTS" "$README_FILE"; then
  # Reemplazar el badge existente
  sed -i "s|RESULTADO DE LOS ÚLTIMOS TESTS: .*|RESULTADO DE LOS ÚLTIMOS TESTS: $BADGE|g" "$README_FILE"
else
  # Añadir el badge si no existe
  echo -e "\nRESULTADO DE LOS ÚLTIMOS TESTS: $BADGE" >> "$README_FILE"
fi
