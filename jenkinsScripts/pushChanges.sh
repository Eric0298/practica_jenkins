#!/bin/bash

# Configurar identidad de Git
git config user.email "ericmancebo6950@gmail.com"
git config user.name "${1:-Jenkins CI}"

# Cambiar a la rama correcta
git checkout ci_jenkins

# Agregar cambios y hacer commit
git add README.md
if git commit -m "Pipeline ejecutada por $1. Motivo: $2"; then
    echo "Commit creado exitosamente."
else
    echo "No hay cambios para commitear."
fi

# Hacer push a la rama remota
git push -u origin ci_jenkins
