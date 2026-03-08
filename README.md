# StudyFlow - AI-Powered Study Platform

Transform PDFs into comprehensive study materials with AI-generated summaries, flashcards, and quizzes.

## 🚀 Quick Deploy Options

### Option 1: Render.com (RECOMMENDED - Easiest)

1. **Go to [render.com](https://render.com)**
2. **Sign up** (free)
3. **New → Web Service**
4. **Connect this repository** or upload files
5. **Settings:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Add Environment Variable:**
     - Key: `ANTHROPIC_API_KEY`
     - Value: Your Claude API key from console.anthropic.com
6. **Deploy!**

Your app will be live at: `https://your-app.onrender.com`

---

### Option 2: Railway.app (Also Easy)

1. **Go to [railway.app](https://railway.app)**
2. **Sign up**
3. **New Project → Deploy from GitHub**
4. **Add Environment Variable:**
   - `ANTHROPIC_API_KEY` = your API key
5. **Deploy!**

---

### Option 3: Glitch (Instant, No Git)

1. **Go to [glitch.com](https://glitch.com)**
2. **New Project → glitch-hello-node**
3. **Copy these files:**
   - `server.js`
   - `package.json`
   - `index.html` (into `public/` folder)
4. **Add `.env` file:**
   ```
   ANTHROPIC_API_KEY=your-api-key-here
   ```
5. **Your app is live instantly!**

---

### Option 4: Replit (Code Online)

1. **Go to [replit.com](https://replit.com)**
2. **Create Repl → Node.js**
3. **Upload files**
4. **Secrets tab:** Add `ANTHROPIC_API_KEY`
5. **Click Run!**

---

## 📁 File Structure

```
studyflow/
├── server.js           # Backend API
├── package.json        # Dependencies
├── public/
│   └── index.html      # Frontend app
└── .env               # API key (don't commit!)
```

---

## 🔑 Get Your API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up/Login
3. API Keys → Create Key
4. Copy the key
5. Add as environment variable: `ANTHROPIC_API_KEY`

---

## 💻 Run Locally

```bash
# Install dependencies
npm install

# Set your API key
export ANTHROPIC_API_KEY="your-api-key"

# Start server
npm start

# Open browser
http://localhost:3000
```

---

## 🎯 Features

- ✅ **Smart Summaries** - AI-generated overviews with YouTube links
- ✅ **Dynamic Flashcards** - 15-20 cards with 3D flip animations
- ✅ **Timed Quizzes** - Adaptive tests with instant feedback
- ✅ **Real PDF Processing** - Extracts text from any PDF
- ✅ **Beautiful UI** - Dark academic design

---

## 🛠️ Tech Stack

- **Frontend:** React (UMD), Tailwind CSS, PDF.js
- **Backend:** Node.js, Express
- **AI:** Claude Sonnet 4 (Anthropic)

---

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Claude API key | ✅ Yes |
| `PORT` | Server port (default: 3000) | ❌ No |

---

## 🌐 Live Demo

Upload a PDF → Get instant study materials!

Features:
- Upload any educational PDF
- AI analyzes the actual content
- Get summaries, flashcards, and quizzes
- Study with interactive tools

---

## 📄 License

MIT License - Free to use!
