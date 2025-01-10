pipeline {
    agent any
    environment {
        // Declaramos las credenciales de Telegram y los resultados de cada etapa
        TELEGRAM_BOT_TOKEN = credentials('telegram_bot_token')
        TELEGRAM_CHAT_ID = credentials('telegram_chat_id')
        EXECUTOR = ''
        MOTIVO = ''
        CHAT_ID = ''
        LINTER_RESULT = ''
        TEST_RESULT = ''
        BUILD_RESULT = ''
        UPDATE_README_RESULT = ''
        DEPLOY_RESULT = ''
    }
    parameters {
        string(name: 'EXECUTOR', defaultValue: '', description: 'Nombre de la persona ejecutando la pipeline')
        string(name: 'MOTIVO', defaultValue: '', description: 'Motivo para ejecutar la pipeline')
        string(name: 'CHAT_ID', defaultValue: '', description: 'Chat ID de Telegram para las notificaciones')
    }
    stages {
        stage('Petició de dades') {
            steps {
                script {
                    // Solicitar los datos a través de los parámetros
                    EXECUTOR = params.EXECUTOR
                    MOTIVO = params.MOTIVO
                    CHAT_ID = params.CHAT_ID
                }
            }
        }

        stage('Linter') {
            steps {
                script {
                    // Ejecutar el linter
                    sh 'npm run lint'  // Asegúrate de tener un script "lint" configurado en tu package.json
                    LINTER_RESULT = currentBuild.result
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Ejecutar los tests con Jest
                    sh 'npm test'
                    TEST_RESULT = currentBuild.result
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Ejecutar el build del proyecto
                    sh 'npm run build'
                    BUILD_RESULT = currentBuild.result
                }
            }
        }

        stage('Update_Readme') {
            steps {
                script {
                    // Ejecutar el script que actualiza el README.md con el badge de los tests
                    sh './jenkinsScripts/updateReadme.sh'
                    UPDATE_README_RESULT = currentBuild.result
                }
            }
        }

        stage('Push_Changes') {
            steps {
                script {
                    // Ejecutar el script para hacer commit y push de los cambios al repositorio
                    sh './jenkinsScripts/pushChanges.sh ${EXECUTOR} ${MOTIVO}'
                }
            }
        }

        stage('Deploy to Vercel') {
            when {
                expression { return BUILD_RESULT == 'SUCCESS' }
            }
            steps {
                script {
                    // Ejecutar el script para desplegar a Vercel
                    sh './jenkinsScripts/deployToVercel.sh'
                    DEPLOY_RESULT = currentBuild.result
                }
            }
        }

        stage('Notificació') {
            steps {
                script {
                    // Enviar la notificación a Telegram
                    sh "./jenkinsScripts/sendNotification.sh ${TELEGRAM_CHAT_ID} ${LINTER_RESULT} ${TEST_RESULT} ${UPDATE_README_RESULT} ${DEPLOY_RESULT}"
                }
            }
        }
    }
    post {
        always {
            // Enviar mensaje final con los resultados de la ejecución
            echo "Pipeline ejecutada por ${EXECUTOR} con motivo: ${MOTIVO}"
        }
    }
}
