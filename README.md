# agnos-socket

Express + Socket.IO (TypeScript) Server

This project sets up a real-time Socket.IO server using Express and TypeScript, suitable for local development, testing, or small-scale demos such as chat applications, dashboards, or real-time monitoring.

⸻

🚀 Features
• Built with TypeScript for type safety.
• Real-time communication with Socket.IO.
• Lightweight setup using Express.js.
• Ready for deployment on Railway, Render, or any Node hosting platform.
• CORS enabled for cross-origin connections (works with any frontend framework such as Next.js or React).

⸻

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
}
}
```

⚙️ Scripts

Add this to your package.json:

"scripts": {
"dev": "nodemon --exec ts-node src/server.ts"
}

Run the server in development mode:

npm run dev

☁️ Deployment Tips
• Works perfectly on Railway Free Tier (512MB RAM, 0.2 vCPU)
• Set PORT environment variable if required.
• Ensure CORS is configured properly if connecting from external domains.

Author: Yo.Pitchayakorn
Tech Stack: Express.js · Socket.IO · TypeScript · CORS
