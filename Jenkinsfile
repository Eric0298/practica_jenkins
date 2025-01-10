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
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Instalar las dependencias del proyecto antes de lint y test
                    sh 'npm install'
                }
            }
        }

        stage('Linter') {
            steps {
                script {
                    sh 'npm run lint'  // Asegúrate de tener un script "lint" configurado en tu package.json
                    LINTER_RESULT = currentBuild.result
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm test'
                    TEST_RESULT = currentBuild.result
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                    BUILD_RESULT = currentBuild.result
                }
            }
        }

        stage('Update_Readme') {
            steps {
                script {
                    sh './jenkinsScripts/updateReadme.sh'
                    UPDATE_README_RESULT = currentBuild.result
                }
            }
        }

        stage('Push_Changes') {
            steps {
                script {
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
                    sh './jenkinsScripts/deployToVercel.sh'
                    DEPLOY_RESULT = currentBuild.result
                }
            }
        }

        stage('Notificació') {
            steps {
                script {
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
