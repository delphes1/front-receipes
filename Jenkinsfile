pipeline {
  agent any
    
  stages {

    stage('Cloning Git') {
      steps {
        git 'https://github.com/delphes1/front-receipes'
      }
    }

    stage('Test') {
      steps {
         sh 'yarn test'
      }
    }      
  }
}