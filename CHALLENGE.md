# Star Wars TicTacToe - Technical Challenge

## Challenge Overview

Welcome to the Star Wars TicTacToe Technical Challenge! This project contains a fully functional TicTacToe game built with Qwik framework, but there's a disturbance in the Force...

The application contains **10 intentionally placed bugs** that need to be identified, documented, and fixed. These bugs test your understanding of the Qwik framework, its unique features, and common pitfalls in modern web development.

## Requirements

### Your Mission:

1. **Find all 10 bugs** in the application
2. **Document each bug** with:
   - Clear description of the issue
   - Why it's happening (root cause)
   - How you discovered it
   - Your approach to fixing it
3. **Fix all bugs** with proper solutions
4. **Submit your work** via a Git repository

### Deliverables:

1. **Bug Report Document** (`BUG_REPORT.md`):
   - List all 10 bugs (or the amount you found)
   - For each bug, include:
     - Bug title
     - Description
     - Steps to reproduce
     - Root cause analysis
     - Solution implemented
     - File(s) modified

2. **Fixed Codebase**:
   - All bugs should be properly fixed
   - Code should be clean and well-commented where necessary
   - Application should run without errors

3. **Git History**:
   - Create meaningful commits for each bug fix
   - Use clear commit messages (e.g., "Fix: Difficulty level inversion in AI player")

## Project Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## How to Test the Application

1. Navigate to `/login` and enter any username
2. Select a difficulty level in `/game-setup`
3. Play the game against the AI
4. Test all features:
   - Board interactions
   - Score tracking
   - Game reset
   - Difficulty switching
   - Winner modal
   - UI responsiveness

## Important Notes

- **DO NOT use AI tools** to complete this challenge (ChatGPT, Copilot, etc.)
- You may use official documentation and traditional resources
- The bugs are specifically designed to be challenging for AI to detect
- Focus on understanding Qwik's unique architecture and patterns
- **Submit your challenge even if you don't find all 10 bugs** - we value your approach and the bugs you do find

## Submission

Once completed, please:

1. Push your solution to a private Git repository
2. Include the `BUG_REPORT.md` in the root directory
3. Ensure all bugs are fixed and the application runs correctly
4. Share repository access with **lufroes** (https://github.com/lufroes)

## Good Luck!

May the Force be with you in debugging this application. Remember, patience and systematic debugging are your best allies. Test thoroughly, think about edge cases, and consider how Qwik's unique features might be causing unexpected behavior.

---

**Note**: This challenge is designed to test real understanding of the Qwik framework. The bugs are crafted to require human insight and cannot be easily solved by automated tools or AI assistants.
