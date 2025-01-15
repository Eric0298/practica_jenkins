#!/bin/bash
EXECUTOR=${1:-"Jenkins CI"}
MOTIVO=${2:-"Sin motivo especificado"}
# Configurar identidad de Git
git config user.email "ericmancebo6950@gmail.com"
git config user.name "$EXECUTOR"

# Cambiar a la rama correcta
git fetch origin
git checkout ci_jenkins
git pull origin ci_jenkins --rebase

# Agregar cambios y hacer commit
git add README.md
if git commit -m "Pipeline ejecutada por $EXECUTOR. Motivo: $MOTIVO"; then
    echo "Commit creado exitosamente."
else
    echo "No hay cambios para commitear."
fi


# Hacer push a la rama remota
git push -u origin ci_jenkins
