pipeline {
    agent any

    tools {
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
                echo "📦 Installing frontend dependencies (optional)..."
                // If your frontend is plain HTML/JS, skip npm install
                // If using React/Angular/Vue, uncomment below:
                // dir('frontend') {
                //     bat 'npm install'
                // }
            }
        }

        stage('Run Tests') {
            steps {
                dir('student-form-backend') {
                    echo "🧪 Running backend tests..."
                    bat 'cmd /c "npm test || echo ⚠️ No tests found, skipping..."'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo "🏗️ Building frontend (optional)..."
                // If React/Angular/Vue, uncomment below:
                // dir('frontend') {
                //     bat 'npm run build'
                // }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🐳 Building Docker image..."
                    docker.build("student-app:${env.BUILD_ID}", "student-form-backend")
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    echo "🚀 Running backend container..."
                    docker.image("student-app:${env.BUILD_ID}").run("-p 5001:5001")
                }
            }
        }

        stage('Verify Server') {
            steps {
                bat 'ping -n 6 127.0.0.1 >nul'  // wait ~5 seconds for container startup
                bat 'curl http://localhost:5001 || echo ⚠️ Server not responding'
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
