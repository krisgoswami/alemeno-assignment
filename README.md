# Alemeno Course

## Description

Alemeno Course is an online learning platform that delivers educational courses over the internet.

![Screenshot (90)](https://github.com/krisgoswami/alemeno-assignment/assets/91143716/e15f6277-8f48-4e25-9765-74fbb06a3fcf)
![Screenshot (91)](https://github.com/krisgoswami/alemeno-assignment/assets/91143716/b433aeaa-c155-4477-9476-8c26f86ddd5d)
![Screenshot (95)](https://github.com/krisgoswami/alemeno-assignment/assets/91143716/5b734214-7381-47a5-9651-4395b124ffbf)
![Screenshot (92)](https://github.com/krisgoswami/alemeno-assignment/assets/91143716/ac748d67-b6d7-42fa-8b3a-2ce4066e6276)

## Features

- User signup and login
- User can update their profile after succesfull login.
- Admin can create, update, delete their respective courses.
- User can purchase course and can access to view purchased course in the dashboard.
- Dark and light UI modes.

<!-- demo -->

## Tech Stack Used

- **Frontend**: React, Redux, Tailwind CSS

- **Backend**: Node.js, Express.js, MongoDB, JSON Web Tokens (JWT) for authentication

## Installation

Follow these steps to set up the ToDo App on your local environment:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/krisgoswami/alemeno-assignment.git

   cd alemeno-assignment
   ```

2. **Backend Setup**:

   - Navigate to the `Server` directory:

     ```bash
     cd server
     ```

   - Install the required dependencies:

     ```bash
     npm install
     ```

   - Configure the environment variables:

     - Create a `.env` file in the `server` directory.
     - Define the following variables:

       ```env
       PORT=8080
       MONGO_URI=<your-database-url
       SECRET=<your-secret-key>
       ```

   - Start the backend server:

     ```bash
     npm run start
     ```

3. **Frontend Setup**:

   - Navigate to the `Client` directory:

     ```bash
     cd Client
     ```

   - Install the required dependencies:

     ```bash
     npm install
     ```

   - Start the frontend application:

     ```bash
     npm run dev
     ```

4. **Admin Panel Setup**:

   - Navigate to the `adminPanel` directory:

     ```bash
     cd adminPanel
     ```

   - Install the required dependencies:

     ```bash
     npm install
     ```

   - Start the frontend application:

     ```bash
     npm run dev
     ```

4. **Access the App**:

   - Open a web browser and go to `http://localhost:5173` to access the Client Side.
   - Open a web browser and go to `http://localhost:5174` to access the Admin Side.
