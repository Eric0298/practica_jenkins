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
                    sh 'npm run test:jest'
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

        stage('Check Permissions') {
            steps {
                script {
                    echo "Verificando permisos de los scripts..."
                    sh 'ls -l ./jenkinsScripts/'
                }
            }
        }

        stage('Update_Readme') {
            steps {
                script {
                    echo "Asignando permisos de ejecución al script..."
                    sh 'chmod +x ./jenkinsScripts/updateReadme.sh'
                    echo "Actualizando README..."
                    sh './jenkinsScripts/updateReadme.sh'
                    UPDATE_README_RESULT = currentBuild.result
                }
            }
        }

        stage('Push_Changes') {
            steps {
                script {
                    echo "Configurando identidad de Git y enviando cambios..."
                    sh 'chmod +x ./jenkinsScripts/pushChanges.sh'
                    withCredentials([usernamePassword(credentialsId: '680e2c18-0bce-4ff0-b6f0-7e4cd45bf25d', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        sh """
                            git config credential.helper 'store'
                            echo 'https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com' > ~/.git-credentials
                        """
                        sh './jenkinsScripts/pushChanges.sh "${EXECUTOR}" "${MOTIVO}"'
                    }
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
                    withCredentials([string(credentialsId: 'vercel_token', variable: 'VERCEL_TOKEN')]) {
                        sh "vercel --token $VERCEL_TOKEN --prod"
                    }
                    DEPLOY_RESULT = currentBuild.result
                }
            }
        }

        stage('Notificación') {
            steps {
                script {
                    echo "Verificando y asignando permisos de ejecución al script..."
                    sh 'chmod +x ./jenkinsScripts/sendNotification.sh'
                    echo "Enviando notificación a Telegram..."
                    def deployStatus = DEPLOY_RESULT == 'SUCCESS' ? 'Éxito' : (DEPLOY_RESULT == 'NOT_EXECUTED' ? 'No ejecutado' : 'Fallo')
                    sh """
                        ./jenkinsScripts/sendNotification.sh \
                        ${TELEGRAM_CHAT_ID} \
                        ${LINTER_RESULT} \
                        ${TEST_RESULT} \
                        ${UPDATE_README_RESULT} \
                        ${deployStatus}
                    """
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
