# Project Blueprint

## Overview

This document outlines the project structure for a modern, scalable web application.

## Folder Organization

The project is organized into the following directories:

- **`public/`**: Contains all the static assets that will be served to the browser.
    - **`assets/`**: For storing media files.
        - **`images/`**: To store images.
        - **`fonts/`**: To store custom fonts.
    - **`css/`**: Contains the CSS files for styling the application.
    - **`js/`**: Contains the JavaScript files for the application's logic.
    - **`index.html`**: The main entry point of the application.
- **`.idx/`**: Contains environment configuration files for Firebase Studio.
- **`.vscode/`**: Contains IDE-specific settings.
- **`blueprint.md`**: This file, which documents the project.
- **`GEMINI.md`**: Guidelines for the AI assistant.
- **`README.md`**: General information about the project.

## Current Project Structure

```
/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── index.html
├── .idx/
│   ├── dev.nix
│   └── mcp.json
├── .vscode/
│   └── settings.json
├── blueprint.md
├── firebase-debug.log
├── GEMINI.md
└── README.md
```

## Design - Login Page

- **Theme:** Dark, modern, and innovative.
- **Color Palette:**
    - Background: `#121212` (Deep Black)
    - Surface: `#1E1E1E` (Slightly Lighter Black)
    - Primary Accent: `#3D52D5` (Vibrant Blue)
    - Text: `#FFFFFF` (White)
    - Muted Text: `#BDBDBD` (Light Gray)
- **Typography:** 'Poppins' from Google Fonts.
- **Visual Effects:**
    - Soft box-shadow on the login form to create a "lifted" effect.
    - Subtle radial gradient on the body background for depth.
    - Interactive "glow" effect on buttons and input fields when focused.

## Features - Login Page

- **Structure:** Centered login form with clear headings.
- **Inputs:** Fields for email and password with integrated icons.
- **Actions:**
    - "Sign In" button with a prominent design.
    - "Forgot password?" link.
    - A link to the sign-up page for new users.
- **Interactivity:** Smooth transitions and focus states on interactive elements.

## Current Plan

- **Task:** Organize the project folder structure.
- **Status:** Done.
- **Next Steps:** Ready for the next instruction.
