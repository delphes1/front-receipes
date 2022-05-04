pipeline {
  agent any
    
  stages {

    stage('Install dependencies') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Test') {
      steps {
         sh 'npm test'
      }
    }      
  }
}