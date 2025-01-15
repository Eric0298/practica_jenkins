#!/bin/bash

# Ruta del README
README_FILE="README.md"

# Validar parámetro de entrada
if [ -z "$1" ]; then
  echo "Error: No se proporcionó un resultado (SUCCESS o FAILURE)."
  exit 1
fi

# Verificar el parámetro de entrada
echo "Resultado recibido: $1"
if [ "$1" == "SUCCESS" ]; then
  BADGE="![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)"
else
  BADGE="![Failure](https://img.shields.io/badge/test-failure-red)"
fi

# Actualizar el README
if grep -q "RESULTADO DE LOS ÚLTIMOS TESTS" "$README_FILE"; then
  # Reemplazar el badge existente
  sed -i "s|RESULTADO DE LOS ÚLTIMOS TESTS: .*|RESULTADO DE LOS ÚLTIMOS TESTS: $BADGE|g" "$README_FILE"
  echo "Badge reemplazado en el README."
else
  # Añadir el badge si no existe
  echo -e "\nRESULTADO DE LOS ÚLTIMOS TESTS: $BADGE" >> "$README_FILE"
  echo "Badge añadido al README."
fi
