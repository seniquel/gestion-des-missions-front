pipeline {
  agent any

  tools {
    nodejs "NodeJS"
  }

  stages {
    stage('build') {
      steps {
        sh "npm install"
        sh "npm run build"
      }
    }
    stage('deploy-master') {
      when {
		    branch 'master'
		 }
     steps {
        sh "ng deploy --no-silent --base-href=https://2020-d05-java-devops.github.io/gestion-des-missions-front/"
      }
    }
  }
  post {

		failure {
      discordSend description: "${env.GIT_URL} ${env.GIT_COMMIT}", footer: "#${env.BUILD_NUMBER} - Failure", image: '', link: "${env.BUILD_URL}", result: 'FAILURE', thumbnail: "", title: "${env.JOB_NAME}, ${env.GIT_BRANCH}", webhookURL: "${env.WEBHOOK_URL}"
		}
		success {
			script {
				if ("${env.BRANCH_NAME}" == 'master')
          discordSend description: "${env.GIT_URL} ${env.GIT_COMMIT}", footer: "#${env.BUILD_NUMBER} - Success", image: '', link: "${env.BUILD_URL}", result: 'SUCCESS', thumbnail: "", title: "${env.JOB_NAME}", webhookURL: "${env.WEBHOOK_URL}"
			}
		}
	}
}

