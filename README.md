# Star Wars Tic Tac Toe - Technical Challenge

## Overview

This is a Star Wars-themed Tic Tac Toe game built with the Qwik framework. The repository is part of a technical assessment designed to evaluate understanding of the Qwik framework and modern web development practices.

## Challenge Instructions

Please refer to [CHALLENGE.md](CHALLENGE.md) for the complete challenge requirements and submission guidelines.

## Project Setup

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd star-wars-tictactoe
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
star-wars-tictactoe/
├── apps/
│   └── star-wars-tictactoe/    # Main Qwik application
├── libs/
│   ├── game-engine/            # Core game logic and AI
│   ├── ui-components/          # Reusable UI components
│   └── auth/                   # Authentication logic
├── nx.json                     # Nx configuration
├── package.json
├── CHALLENGE.md                # Challenge instructions
└── README.md
```

## Application Features

- Play against an AI opponent with three difficulty levels
- Built with Qwik for optimal performance
- Star Wars-themed UI with visual effects
- Score tracking across multiple games
- Responsive design

## How to Navigate the Application

1. **Login**: Enter your name at `/login`
2. **Setup**: Choose difficulty at `/game-setup`
3. **Play**: Make moves on the game board at `/game`
4. **Features to test**:
   - Board interactions
   - Score tracking
   - Game reset functionality
   - Difficulty switching
   - Winner modal
   - UI responsiveness

---

Good luck with the challenge!