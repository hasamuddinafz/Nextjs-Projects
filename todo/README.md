# Next.js Todo App

A clean, responsive Todo application built with **Next.js “App Router”** and React hooks—featuring form management, schema validation, toast notifications, and persistent storage. Styled effortlessly with Tailwind CSS and enhanced by Heroicons for interactive controls.

---

## Technologies & Libraries

- **Next.js (13+)** – React framework with file-based routing and server/client components  
- **React Hooks** – `useState` for local state, `useEffect` for side effects & hydration  
- **Formik** – Declarative form state management  
- **Yup** – Schema-based validation for Formik  
- **React Toastify** – Accessible toast notifications for success, info, warning, and error feedback  
- **Tailwind CSS** – Utility-first styling for rapid, responsive design  
- **Heroicons** – SVG icon components (checkmark & trash)  
- **localStorage** – Browser storage to persist and rehydrate todos across sessions  

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/hasamuddinafz/Nextjs-Projects.git
   cd your-repo
# Features

- **Add, complete & delete todos**
  - **Add Todo** opens a modal form
  - Toggle *done/undone* via the check-mark icon
  - Remove items via the trash icon

- **Form handling & validation**
  - Formik manages form state (`values`, `touched`, `errors`, `isSubmitting`)
  - Yup enforces non-empty, trimmed input
  - Inline error messages under the input field

- **Toast notifications**
  - Success when a todo is added
  - Info when status toggles
  - Warning on delete
  - Error on empty submission
  - Auto-dismiss after 2 seconds, positioned top-right

- **Persistent storage**
  - Load from **localStorage** on mount
  - Save to **localStorage** on any change
  - Graceful handling of JSON parse errors

- **Filtering**
  - *All*, *Active* (incomplete), *Completed* filters
  - Current filter button is highlighted

- **Responsive & styled**
  - Tailwind CSS for spacing, typography, colours and animations
  - Gradient background, rounded cards, smooth transitions

---

# Project Structure

```text
├── pages/  
│   └── index.js         # Main client component (“use client”)  
├── public/              # Static assets (images, icons)  
├── styles/              # Global CSS & Tailwind config  
├── package.json         # Dependencies & scripts  
└── tailwind.config.js   # Tailwind customization  
