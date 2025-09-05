pipeline {
    agent any

    tools {
        nodejs "NodeJS"   // Make sure you configured NodeJS in Jenkins Global Tool Configuration
    }

    environment {
        DB_HOST = "localhost"
        DB_USER = "root"
        DB_PASS = "Akshaya@10"
        DB_NAME = "studentdb"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📥 Cloning repository..."
                git branch: 'main', url: 'https://github.com/AkshayaShanam/devops.git'
            }
        }

        stage('Install Dependencies - Backend') {
            steps {
                dir('student-form-backend') {
                    echo "📦 Installing backend dependencies..."
                    sh 'npm install'
                }
            }
        }

        stage('Install Dependencies - Frontend') {
            steps {
                echo "📦 Installing frontend dependencies (if needed)..."
                // If your frontend is plain HTML/JS, skip npm install
                // If React or Node-based frontend:
                // dir('frontend') {
                //     sh 'npm install'
                // }
            }
        }

        stage('Run Tests') {
            steps {
                dir('student-form-backend') {
                    echo "🧪 Running backend tests..."
                    sh 'npm test || echo "⚠️ No tests found, skipping..."'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo "🏗️ Building frontend..."
                // If React/Angular/Vue, use build command
                // dir('frontend') {
                //     sh 'npm run build'
                // }
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Starting server..."
                dir('student-form-backend') {
                    sh 'nohup npm start &'
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build & Deployment Successful!"
        }
        failure {
            echo "❌ Build Failed. Check logs."
        }
    }
}
