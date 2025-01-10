pipeline {
    agent any
    environment {
        EXECUTOR = ''
        MOTIVO = ''
        CHAT_ID = ''
        LINTER_RESULT = ''
        TEST_RESULT = ''
        BUILD_RESULT = ''
        UPDATE_README_RESULT = ''
        DEPLOY_RESULT = ''
    }
    stages {
        stage('Petició de dades') {
            steps {
                script {
                    EXECUTOR = input(message: 'Qui està executant aquesta pipeline?', parameters: [string(defaultValue: '', description: 'Nom de la persona')])
                    MOTIVO = input(message: 'Motiu per executar la pipeline?', parameters: [string(defaultValue: '', description: 'Motiu')])
                    CHAT_ID = input(message: 'Introduir Chat ID per notificacions de Telegram:', parameters: [string(defaultValue: '', description: 'Chat ID')])
                }
            }
        }

        stage('Linter') {
            steps {
                script {
                    // Aquí debes ejecutar el linter configurado
                    sh 'npm run lint' // O el comando correspondiente
                    LINTER_RESULT = currentBuild.result
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Ejecutar los tests
                    sh 'npm test'
                    TEST_RESULT = currentBuild.result
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Ejecutar el build
                    sh 'npm run build'
                    BUILD_RESULT = currentBuild.result
                }
            }
        }

        stage('Update_Readme') {
            steps {
                script {
                    // Ejecutar el script para actualizar README.md
                    sh './jenkinsScripts/updateReadme.sh'
                    UPDATE_README_RESULT = currentBuild.result
                }
            }
        }

        stage('Push_Changes') {
            steps {
                script {
                    // Script para hacer commit y push de los cambios
                    sh './jenkinsScripts/pushChanges.sh'
                }
            }
        }

        stage('Deploy to Vercel') {
            when {
                expression { return BUILD_RESULT == 'SUCCESS' }
            }
            steps {
                script {
                    // Desplegar a Vercel
                    sh './jenkinsScripts/deployToVercel.sh'
                    DEPLOY_RESULT = currentBuild.result
                }
            }
        }

        stage('Notificació') {
            steps {
                script {
                    // Enviar notificación a Telegram
                    withCredentials([string(credentialsId: 'telegram_bot_token', variable: 'BOT_TOKEN'),
                                     string(credentialsId: 'telegram_chat_id', variable: 'CHAT_ID')]) {
                    sh "./jenkinsScripts/sendNotification.sh ${CHAT_ID} ${LINTER_RESULT} ${TEST_RESULT} ${UPDATE_README_RESULT} ${DEPLOY_RESULT}"
                }
            }
        }
        }
    }

    post {
        always {
            // Mensaje final con los resultados de la ejecución
            echo "Pipeline ejecutada por ${EXECUTOR} con motivo: ${MOTIVO}"
            echo "Resultados de la ejecución: "
            echo "Linter: ${LINTER_RESULT}"
            echo "Test: ${TEST_RESULT}"
            echo "Update Readme: ${UPDATE_README_RESULT}"
            echo "Deploy to Vercel: ${DEPLOY_RESULT}"
        }
    }
}
