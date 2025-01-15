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
        DEPLOY_RESULT = 'NOT_EXECUTED' // Valor predeterminado
    }
    parameters {
        string(name: 'EXECUTOR', defaultValue: '', description: 'Nombre de la persona ejecutando la pipeline')
        string(name: 'MOTIVO', defaultValue: '', description: 'Motivo para ejecutar la pipeline')
        string(name: 'CHAT_ID', defaultValue: '', description: 'Chat ID de Telegram para las notificaciones')
    }
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM',
                        branches: [[name: '*/ci_jenkins']],
                        userRemoteConfigs: [[url: 'https://github.com/Eric0298/practica_jenkins.git']]
                    ])
                }
            }
        }

        stage('Set Permissions') {
            steps {
                script {
                    echo "Configurando permisos de los scripts..."
                    sh 'chmod +x ./jenkinsScripts/*.sh'
                }
            }
        }

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

        // Resto de las etapas...
        
        stage('Notificación') {
            steps {
                script {
                    echo "Enviando notificación a Telegram..."
                    def deployStatus = DEPLOY_RESULT == 'SUCCESS' ? 'Éxito' : (DEPLOY_RESULT == 'NOT_EXECUTED' ? 'No ejecutado' : 'Fallo')
                    withEnv(["TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}"]) {
                        sh """
                            ./jenkinsScripts/sendNotification.sh \
                            \$TELEGRAM_CHAT_ID \
                            ${LINTER_RESULT} \
                            ${TEST_RESULT} \
                            ${UPDATE_README_RESULT} \
                            ${deployStatus}
                        """
                    }
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
