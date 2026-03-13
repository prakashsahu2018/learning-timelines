# 🎨 Learning Journey UI Design System

A complete React application with **12 unique timeline designs** for learning journeys, courses, and skill development tracking.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 📁 Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with navigation |
| `/simple` | Simple Timelines | 6 clean, minimal designs |
| `/innovative` | Innovative Designs | 6 creative, gamified patterns |

## 🎨 Design Patterns

### 📋 Simple Timelines (`/simple`)

| Design | Description |
|--------|-------------|
| Vertical Timeline | Classic connected nodes with cards |
| Horizontal Steps | Top progress bar + section details |
| Card Grid | Dashboard-style overview |
| Minimal List | Accordion, mobile-friendly |
| Roadmap | Zigzag alternating path |
| Modern Stepper | Clean vertical with inline items |

### ✨ Innovative Designs (`/innovative`)

| Design | Inspired By | Description |
|--------|-------------|-------------|
| Duolingo Path | Duolingo | Winding path, XP, streaks |
| Metro Map | Transit maps | Subway-style route |
| Skill Tree | RPG Games | Branching nodes, levels |
| Progress Rings | Apple Watch | Concentric circles |
| Kanban Board | Trello/Jira | Column-based layout |
| Streaming Style | Netflix | Dark theme, cards |

## 📁 Project Structure

```
src/
├── App.jsx              # Routes & Navigation
├── main.jsx             # Entry point with BrowserRouter
├── Home.jsx             # Landing page
├── LearningTimelines.jsx    # 6 simple designs
├── InnovativeDesigns.jsx    # 6 creative designs
└── index.css            # Tailwind CSS
```

## ✨ Features

- **12 Total Designs** - 2 categories, 6 each
- **React Router** - Client-side routing
- **Progress Tracking** - Bars, rings, indicators
- **Status States** - Completed, In Progress, Locked
- **Gamification** - XP, levels, achievements
- **Responsive** - Desktop & mobile

## 🛠️ Tech Stack

- React 18
- React Router DOM
- Vite
- Tailwind CSS

## License

MIT
