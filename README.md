# Task Manager App

A simple and efficient task management application built with **React Native (Expo)**, designed for modern productivity.

This project was developed to connect with a robust, cloud-hosted **Java Spring Boot API**, demonstrating a full-stack, enterprise-grade architecture.

## Academic Context and Architecture

This application was developed during the academic semester of **Special Topics in Computing: Trending Information Technologies** at **Unisinos (06/2025)**.

The primary focus of this project was the implementation of a **Serverless-Managed Backend** structure on Amazon Web Services (AWS), utilizing the following services:

| Component | Service | Role |
| :--- | :--- | :--- |
| **Backend Orchestration** | **AWS Elastic Beanstalk** | Automates Java environment setup, scaling, and deployment (PaaS). |
| **Authentication** | **AWS Cognito** | External Identity Provider for secure user sign-up and JWT token generation. |
| **Data Persistence** | **AWS RDS (PostgreSQL)** | Managed relational database for task storage. |
| **Monitoring** | **AWS CloudWatch** | Real-time observability for API performance and server health. |

This mobile application consumes the API via secure JWT tokens, ensuring that all data persistence and security logic is handled by the cloud backend.

## Features

- **User Authentication**: Secure login and registration.
- **Task Management**: Create, view, edit and delete tasks.
- **Task Status**: Mark tasks as pending or completed.
- **Responsive Design**: Works on Android, iOS, and Web.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
- **Expo Go**: Install the Expo Go app on your mobile device (available on Google Play Store and Apple App Store) if you want to test on a physical device.

## Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies**:
    Open your terminal in the project folder and run:
    ```bash
    npm install
    ```

## Running the App

1.  **Start the development server**:
    ```bash
    npm start
    ```
    or
    ```bash
    npx expo start
    ```

2.  **Open the app**:
    -   **On Mobile (Physical Device)**: Scan the QR code displayed in the terminal using the Expo Go app (Android) or the Camera app (iOS).
    -   **On Android Emulator**: Press `a` in the terminal.
    -   **On iOS Simulator**: Press `i` in the terminal (macOS only).
    -   **On Web**: Press `w` in the terminal.

## Usage Guide

### 1. Registration
- Upon opening the app, if you are not logged in, you will be redirected to the **Login** screen.
- Click on the "Register" link to create a new account.
- Fill in your details and submit to create your account.

### 2. Login
- Enter your credentials on the Login screen to access your tasks.

### 3. Managing Tasks
- **View Tasks**: The main screen displays your list of tasks.
- **Add Task**: Tap the "New Task" button to create a new task. Enter the title and description, then save.
- **Complete Task**: Tap on a task to mark it as completed or toggle its status.

## Project Structure

- `app/`: Contains the main application screens and routing logic.
    - `login.tsx`: Login screen.
    - `register.tsx`: Registration screen.
    - `tasks/`: Task-related screens (list, create).
- `components/`: Reusable UI components (e.g., `TaskItem`).
- `contexts/`: React Contexts for state management (`AuthContext`, `TaskContext`).
- `services/`: API services for backend communication.

## Technologies Used

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
