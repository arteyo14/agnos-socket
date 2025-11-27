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
| **Frontend (Next.js)**                  | https://agnos-test-pi.vercel.app/             |
| **Socket Server (Express + Socket.IO)** | https://agnos-socket-production.up.railway.app |


### 🔐 Demo Accounts

| Role | Username | Password |
|------|-----------|-----------|
| 🩺 **Staff (Viewer)** | staff1 | P@ssw0rd! |
| 👤 **Patient (Form User)** | patient1 | P@ssw0rd! |

> **Note:**  
> The authentication shown here is for **demonstration purposes only**.  
> These accounts and credentials are **mock users** created solely to illustrate the **real-time synchronization flow** between patient and staff dashboards.  
> No actual authentication, data protection, or secure storage mechanisms have been implemented in this prototype version.

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
