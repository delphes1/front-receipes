pipeline {
  agent any
    
  stages {

    stage('update apt') {
      steps {
        sh 'apt update'
      }
    }

    stage('upgrade apt') {
      steps {
        sh 'apt upgrade'
      }
    }      

    stage('Install dependencies') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Test') {
      steps {
         sh 'yarn test'
      }
    }      
  }
}