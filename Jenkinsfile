pipeline {
  agent any
    
  stages {

    stage('apt') {
      steps {
        sh 'sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb'
      }
    }

    stage('update apt') {
      steps {
        sh 'sudo apt update'
      }
    }

    stage('upgrade apt') {
      steps {
        sh 'sudo apt upgrade'
      }
    }      

    stage('Install dependencies') {
      steps {
        sh 'sudo yarn install'
      }
    }

    stage('Test') {
      steps {
         sh 'sudo yarn test'
      }
    }      
  }
}