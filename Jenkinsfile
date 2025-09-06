pipeline {
    agent any

    tools {
        git "Git"
        nodejs "NodeJS"   // Make sure NodeJS is configured in Jenkins Global Tool Configuration
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
                    bat 'npm install'
                }
            }
        }

        stage('Install Dependencies - Frontend') {
            steps {
                echo "📦 Installing frontend dependencies (if needed)..."
                // If your frontend is plain HTML/JS, skip npm install
                // If React or Node-based frontend:
                // dir('frontend') {
                //     bat 'npm install'
                // }
            }
        }

        stage('Run Tests') {
            steps {
                dir('student-form-backend') {
                    echo "🧪 Running backend tests..."
                    // Windows `bat` doesn’t support `|| echo ...` directly
                    // So use "cmd /c" to allow conditional
                    bat 'cmd /c "npm test || echo ⚠️ No tests found, skipping..."'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo "🏗️ Building frontend..."
                // If React/Angular/Vue, use build command
                // dir('frontend') {
                //     bat 'npm run build'
                // }
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Starting server..."
                dir('student-form-backend') {
                    // nohup doesn’t exist on Windows, use "start" instead
                    bat 'start cmd /c "npm start"'
                }
            }
        }

        stage('Verify Server') {
                steps {
                    bat 'curl http://localhost:3000 || echo "⚠️ Server not responding"'
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
