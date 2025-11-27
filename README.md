# agnos-socket

Express + Socket.IO (TypeScript) Server

This project provides a **real-time communication backend** built with Express and Socket.IO, designed to synchronize data between patients and staff in real-time.

⸻

🚀 Features

- 🧩 Built with **TypeScript** for type safety
- ⚡ Real-time synchronization via **Socket.IO**
- 🧠 Structured event handling (joinRoom, typing:start, typing:stop)
- 🌐 **CORS ready** for external frontend connection (Next.js, React, etc.)
- ☁️ Easy to deploy on **Railway**, **Render**, or other Node.js hosts
- 🔁 Works with multiple clients (1-to-1 or 1-to-many rooms)

⸻

## 🚀 Live Demo

| Service                                 | URL                                            |
| --------------------------------------- | ---------------------------------------------- |
| **Frontend (Next.js)**                  | https://agnos-test-pi.vercel.app/              |
| **Socket Server (Express + Socket.IO)** | https://agnos-socket-production.up.railway.app |

### 🔐 Demo Accounts

| Role                       | Username | Password  |
| -------------------------- | -------- | --------- |
| 🩺 **Staff (Viewer)**      | staff1   | P@ssw0rd! |
| 👤 **Patient (Form User)** | patient1 | P@ssw0rd! |

> **Note:**  
> The authentication shown here is for **demonstration purposes only**.  
> These accounts and credentials are **mock users** created solely to illustrate the **real-time synchronization flow** between patient and staff dashboards.  
> No actual authentication, data protection, or secure storage mechanisms have been implemented in this prototype version.

## 🔄 Real-Time Synchronization Flow

This section describes how real-time communication occurs between the **Patient Form** and the **Staff Dashboard** using **Socket.IO**.

---

### 🧩 Event Overview

| Event Name     | Triggered By    | Payload                        | Broadcast To                                                  | Purpose                                                           |
| -------------- | --------------- | ------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| `joinRoom`     | Patient / Staff | `{ patient_id }`               | Server joins both clients into the same room (`patient_{id}`) | Establishes a private channel between patient and staff           |
| `typing:start` | Patient         | `{ patient_id, field, value }` | Staff (in same room)                                          | Notifies staff when the patient starts typing in a specific field |
| `typing:stop`  | Patient         | `{ patient_id, field }`        | Staff (in same room)                                          | Indicates patient has stopped typing in that field                |
| `form:submit`  | Patient         | `{ patient_id, form_data }`    | Staff (in same room)                                          | Sends the full form once the patient submits data                 |
| `disconnect`   | Any client      | —                              | Server log                                                    | Logs client disconnection for debugging                           |

---

### ⚙️ Event Flow Description

1. **Room Connection**

   - When a patient opens the form or a staff member opens the monitoring dashboard, both emit:
     ```js
     socket.emit('joinRoom', { patient_id: '1234' });
     ```
   - Server groups them under the same socket room: `patient_1234`

2. **Typing Detection**

   - As the patient types, input events trigger:
     ```js
     socket.emit('typing:start', {
       patient_id: '1234',
       field: 'firstname',
       value: 'Joh',
     });
     ```
   - Server emits to all other users in the same room:
     ```js
     socket.to('patient_1234').emit('typing', {
       field: 'firstname',
       value: 'Joh',
       is_typing: true,
     });
     ```
   - When the patient stops typing (via debounce or blur event):
     ```js
     socket.emit('typing:stop', {
       patient_id: '1234',
       field: 'firstname',
     });
     ```
   - Server updates staff view:
     ```js
     socket.to('patient_1234').emit('typing:update', {
       field: 'firstname',
       is_typing: false,
     });
     ```

3. **Form Submission**
   - When the patient clicks submit:
     ```js
     socket.emit('form:submit', {
       patient_id: '1234',
       form_data: { firstname: 'John', lastname: 'Doe', ... },
     });
     ```
   - The staff dashboard receives an event:
     ```js
     socket.on('form:submitted', () => {
       // Refresh or show success notification
     });
     ```

---

📦 Installation 1. Clone or initialize the project:

mkdir socket-server && cd socket-server
npm init -y

    2.	Install dependencies:

npm install express socket.io cors
npm install -D typescript ts-node nodemon @types/node @types/express

    3.	Create a TypeScript config file:

npx tsc --init

Then replace with:

```
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "strict": true
  },
  "include": ["src"]
}
```

⚙️ Scripts

Add this to your package.json:

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node build/server.js"
}
```

Run the server in development mode:

npm run dev

☁️ Deployment Tips
• Works perfectly on Railway Free Tier (512MB RAM, 0.2 vCPU)
• Set PORT environment variable if required.
• Ensure CORS is configured properly if connecting from external domains.

Author: Yo.Pitchayakorn
Tech Stack: Express.js · Socket.IO · TypeScript · CORS
