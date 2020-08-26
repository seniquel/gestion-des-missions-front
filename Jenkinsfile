pipeline {
    agent any
    tools {
      nodejs "node12.18.3"
    }
    stages {
    	stage('verify') {
        steps{
          sh 'node -v'
        }
		  }
        stage('checkout') {
            steps{
                git 'https://github.com/seniquel/gestion-des-missions-front.git'
            }
        }
        stage('build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('deploy') {
          steps {
            sh 'ng deploy --base-href=/gestion-des-missions-front/'
          }
        }
    }
    post {
        success {
            script {
                if ("${env.BRANCH_NAME}" == 'master')
                    discordSend description: "Success ${env.GIT_COMMIT} ${env.BUILD_URL}",
                        footer: 'Léo est le meilleur', image: '', link: '', result: 'SUCCESS', thumbnail: '',
                        title: "${env.JOB_NAME}",
                        webhookURL: 'https://discordapp.com/api/webhooks/747819422705778738/dHWPHidlNLpiiKftWU84__Ss2LAkws77Swfdk5OWs22qla3hlI1B4zywW8ROg4nAwjRM'
                    slackSend channel: 'jenkins-training', color: 'good',
                        message: "Success ${env.JOB_NAME} ${env.GIT_COMMIT} ${env.BUILD_URL} (Léo)",
                        tokenCredentialId: 'slack-token', teamDomain: 'devinstitut'
            }
        }
        failure {
            discordSend description: "Failure ${currentBuild.displayName} ${env.BUILD_URL}",
                footer: 'Léo a lamentablement échoué', image: '', link: '', result: 'FAILURE', thumbnail: '',
               title: "${env.JOB_NAME}",
                 webhookURL: 'https://discordapp.com/api/webhooks/747819422705778738/dHWPHidlNLpiiKftWU84__Ss2LAkws77Swfdk5OWs22qla3hlI1B4zywW8ROg4nAwjRM'
             slackSend channel: 'jenkins-training', color: 'danger',
                 message: "Failure ${env.JOB_NAME} ${currentBuild.displayName} ${env.BUILD_URL} (Léo)",
                tokenCredentialId: 'slack-token', teamDomain: 'devinstitut'
        }
    }
}
