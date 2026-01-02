```markdown
# ✈️ SonicSlip: Your Audio Boarding Pass

<div align="center">

<img src="https://img.shields.io/badge/Spotify-1DB954?style=for-the-badge&logo=spotify&logoColor=white" alt="Spotify" />
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
<br />
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />

<br />

**The Botanical & Brutalist Sonic Manifest Generator.** *Turn your Spotify stats into high-resolution, downloadable art.*

[View Live Demo](https://sonicslip.vercel.app) • [Author Profile](https://github.com/idrismukthar)

</div>

---

## 🛠️ Tech Stack & Architecture

### **The Engine**
* **Next.js 15 (App Router):** The foundation of the app, providing lightning-fast Server-Side Rendering (SSR) for SEO and high-performance client transitions.
* **Spotify Web API:** Deep integration to fetch user top-performing tracks, artists, and albums across multiple time ranges.
* **Supabase:** Used as the backend-as-a-service to handle database persistence and user authentication state.

### **The Security Layer**
* **Upstash Redis:** To prevent API abuse, I built a custom middleware using Redis to track IP-based request limits.
* **Edge Middleware:** Your requests are validated at the network edge, ensuring that malicious traffic never reaches the main application logic.

### **The Creative Studio**
* **Tailwind CSS:** Powers the 5 distinct design themes with zero runtime overhead.
* **html2canvas:** A highly customized implementation that bypasses **CORS** issues by using Base64-encoded textures, allowing for instant PNG downloads of your boarding passes.

---

## 🎨 Themes Available

### 🌲 Forest Echo
A vintage, botanical aesthetic. Uses organic paper textures and serif typography for a "nature-first" manifest.

### ⚡ CyberPunk
A high-contrast, neon-blue digital ticket. Optimized for high-tech, futuristic vibes with monospaced data grids.

### 💎 GlassVue
A modern take on "Glassmorphism." Features deep blurs, ambient glow effects, and a frosted-panel UI.

### 🏁 MonoRaw
Brutalist and industrial. A black-and-white, ink-heavy design that looks like a raw thermal printer receipt.

---

## 📦 Local Setup

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/idrismukthar/sonicslip-final.git](https://github.com/idrismukthar/sonicslip-final.git)

```

2. **Install dependencies:**
```bash
npm install

```


3. **Set up Environment Variables:**
Create a `.env.local` and add your:
* `SPOTIFY_CLIENT_ID`
* `SPOTIFY_CLIENT_SECRET`
* `UPSTASH_REDIS_REST_TOKEN`


4. **Run development:**
```bash
npm run dev

```



---

<div align="center">
Developed with ❤️ by <b>mhooky</b>
</div>
