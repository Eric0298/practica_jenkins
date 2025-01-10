pipeline {
    agent any
    tools { nodejs "Node" }
    environment {
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
                    EXECUTOR = params.EXECUTOR
                    MOTIVO = params.MOTIVO
                    CHAT_ID = params.CHAT_ID
                    echo "Datos recibidos: Ejecutando por ${EXECUTOR}, motivo: ${MOTIVO}, chat ID: ${CHAT_ID}"
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    echo "Instalando dependencias..."
                    sh 'npm install'
                }
            }
        }

        stage('Linter') {
            steps {
                script {
                    echo "Ejecutando linter..."
                    sh 'npm run lint'
                    LINTER_RESULT = currentBuild.result
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo "Ejecutando tests..."
                    sh 'npm test'
                    TEST_RESULT = currentBuild.result
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Construyendo proyecto..."
                    sh 'npm run build'
                    BUILD_RESULT = currentBuild.result
                }
            }
        }

        stage('Update_Readme') {
            steps {
                script {
                    echo "Actualizando README..."
                    sh './jenkinsScripts/updateReadme.sh'
                    UPDATE_README_RESULT = currentBuild.result
                }
            }
        }

        stage('Push_Changes') {
            steps {
                script {
                    echo "Pusheando cambios al repositorio..."
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
                    echo "Desplegando a Vercel..."
                    sh './jenkinsScripts/deployToVercel.sh'
                    DEPLOY_RESULT = currentBuild.result
                }
            }
        }

        stage('Notificación') {
            steps {
                script {
                    echo "Enviando notificación a Telegram..."
                    sh "./jenkinsScripts/sendNotification.sh ${TELEGRAM_CHAT_ID} ${LINTER_RESULT} ${TEST_RESULT} ${UPDATE_README_RESULT} ${DEPLOY_RESULT}"
                }
            }
        }
    }
    post {
        always {
            echo "Pipeline ejecutada por ${EXECUTOR} con motivo: ${MOTIVO}"
        }
    }
}
