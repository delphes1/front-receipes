pipeline {
  agent any
    
  stages {

    stage('apt') {
      steps {
        sh 'apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb'
      }
    }

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