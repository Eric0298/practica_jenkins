#!/bin/bash

# Validar que los argumentos necesarios se proporcionaron
if [ "$#" -ne 5 ]; then
    echo "Uso: $0 <CHAT_ID> <LINTER_RESULT> <TEST_RESULT> <UPDATE_README_RESULT> <DEPLOY_RESULT>"
    exit 1
fi

# Asignar argumentos a variables
CHAT_ID=$1
LINTER_RESULT=$2
TEST_RESULT=$3
UPDATE_README_RESULT=$4
DEPLOY_RESULT=$5

# Recuperar el token del entorno (pasado por Jenkins como una credencial segura)
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
    echo "Error: TELEGRAM_BOT_TOKEN no está definido. Asegúrate de que esté configurado como una credencial de Jenkins."
    exit 1
fi

# Construir el mensaje
MESSAGE="Pipeline ejecutada con los siguientes resultados:
- Linter: $LINTER_RESULT
- Test: $TEST_RESULT
- Update Readme: $UPDATE_README_RESULT
- Deploy to Vercel: $DEPLOY_RESULT"

# Enviar el mensaje a Telegram
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
     -d chat_id="$CHAT_ID" \
     -d text="$MESSAGE"
