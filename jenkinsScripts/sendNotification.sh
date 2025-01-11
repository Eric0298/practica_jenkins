#!/bin/bash

# Recuperar el token y chat_id desde las credenciales de Jenkins
BOT_TOKEN=$(cat /var/jenkins_home/creds/telegram_bot_token)
CHAT_ID=$(cat /var/jenkins_home/creds/telegram_chat_id)

# Enviar el mensaje a Telegram
curl -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage \
-d chat_id=${CHAT_ID} \
-d text="Pipeline ejecutada con los siguientes resultados: 
- Linter: $2
- Test: $3
- Update Readme: $4
- Deploy to Vercel: $5"