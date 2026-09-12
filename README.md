# LiveInk

LiveInk is a real-time collaborative document editor built with Next.js, React, Lexical, Liveblocks, and Clerk. It allows authenticated users to create documents, edit rich text together in real time, collaborate with other users, manage document permissions, and discuss content through threaded comments.

## Features

### Authentication

* **Authentication** powered by Clerk
* Protected dashboard and document routes
* Clerk user identity used throughout the collaboration system
* Clerk appearance automatically follows the application's selected theme

### Document Management

* Create documents
* Rename documents
* Delete documents
* View all documents accessible to the current user
* Search documents by title
* Search state is synchronized with the URL query parameter
* Toggle between grid and list document views
* Display document creation/update information

### Rich Text Editor

LiveInk uses **Lexical** for the document editing experience.

* Rich-text editing
* H1, H2, and H3 headings
* Bold
* Italic
* Underline
* Strikethrough
* Left, center, right, and justified text alignment
* Undo and redo
* Active formatting state in the editor toolbar
* Contextual floating toolbar when selecting text
* Inline comment creation from the floating toolbar
* Placeholder content for empty documents
* View-only editor mode for users without edit permissions

### Real-Time Collaboration

Real-time synchronization is powered by **Liveblocks**.

* Multiple users can edit the same document simultaneously
* Active collaborator presence
* Collaborator avatars
* Consistent collaborator colors
* Real-time document synchronization
* Room-based collaboration architecture
* Role-based access to collaborative documents

Each document is represented by a Liveblocks room.

### Collaboration and Sharing

Document owners can manage access for other users.

* Invite collaborators by email
* Assign `Editor` or `Viewer` permissions
* Remove collaborators
* Display active collaborators
* Prevent viewers from editing document content
* Prevent non-owners from managing document access
* Document owners can rename and delete their documents

### Comments and Threads

LiveInk uses Liveblocks comments and threads for document discussions.

* Create comments from the editor
* Threaded discussions
* Inline/contextual comments
* Comment composer
* Active thread highlighting
* Resolve comments
* Resolved comments are visually de-emphasized
* Collaborator mentions
* Collaborator suggestions when mentioning users

### Notifications

Liveblocks notifications provide collaboration activity updates.

* Comment notifications
* Mention notifications
* Document access/invitation notifications
* Unread notification count
* Notification popover
* Mark/read state handled through Liveblocks

### Themes

LiveInk supports a theme-aware interface.

* Light mode
* Dark mode
* System theme detection
* Manual theme switching
* Theme preference managed with `next-themes`
* Clerk components automatically adapt to the selected application theme
* Lexical editor styling adapts to the current theme
* Theme changes disable transitions to prevent visual flashing

### Document Export

Documents can be exported directly from the editor.

* **PDF export**

  * Uses the browser's native print dialog
  * Print output is scoped to the document content
  * No additional PDF-generation dependency is required
* **Word export**

  * Downloads the rendered document HTML as a `.doc` file
  * Uses the `application/msword` MIME type
  * Compatible with Microsoft Word, Google Docs, and LibreOffice
  * The exported file is HTML-based rather than a true OOXML `.docx` file

### Responsive UI

* Responsive dashboard layout
* Responsive document editor
* Mobile-friendly document search
* Adaptive editor header
* Responsive collaboration and document controls
* Tailwind CSS-based responsive styling

### Error Monitoring

* Sentry integration for application error monitoring
* Client-side instrumentation
* Server-side instrumentation
* Edge runtime monitoring
* Global error handling
* Sentry example route/page included for testing the integration

### Accessibility and UX

* Semantic controls where appropriate
* Accessible labels for editor controls
* Keyboard-friendly editor interactions
* Visual states for active formatting
* Disabled states for unavailable undo/redo actions
* View-only state clearly communicated to users
* Hydration-safe theme toggle to prevent layout shifts

---

## Tech Stack

| Category                | Technology           |
| ----------------------- | -------------------- |
| Framework               | Next.js 16           |
| Language                | TypeScript           |
| UI                      | React 19             |
| Styling                 | Tailwind CSS         |
| Components              | shadcn/ui + Radix UI |
| Editor                  | Lexical              |
| Real-time collaboration | Liveblocks           |
| Authentication          | Clerk                |
| Themes                  | next-themes          |
| Icons                   | Lucide React         |
| Error monitoring        | Sentry               |
| Package manager         | npm                  |

---

## Architecture

LiveInk uses the Next.js App Router with a feature-oriented component and hook structure.

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/
│   │   ├── documents/[id]/
│   │   └── page.tsx
│   ├── api/
│   │   └── liveblocks-auth/
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── dashboard/
│   ├── documents/
│   ├── editor/
│   ├── icons/
│   ├── layout/
│   ├── providers/
│   └── ui/
│
├── hooks/
│   ├── dashboard/
│   ├── documents/
│   ├── editor/
│   └── theme/
│
├── lib/
│   ├── actions/
│   ├── documents/
│   ├── editor/
│   ├── permissions.ts
│   └── liveblocks.ts
│
├── styles/
├── types/
└── instrumentation*.ts
```

The project separates UI components, reusable hooks, server actions, editor utilities, permissions, and external-service configuration.

---

## How Collaboration Works

Each document is represented by a Liveblocks room.

When a document is created, LiveInk creates a Liveblocks room with metadata containing the document owner and title. The creator receives write access automatically.

Users can then be invited to the room.

### Roles

* **Creator**

  * Owns the document
  * Can edit content
  * Can rename the document
  * Can invite collaborators
  * Can remove collaborators
  * Can delete the document

* **Editor**

  * Can edit document content
  * Cannot rename the document
  * Cannot manage collaborators
  * Cannot delete the document

* **Viewer**

  * Can view document content
  * Cannot edit document content
  * Cannot rename, share, or delete the document

Clerk handles authentication and user identity, while Liveblocks handles room access, real-time synchronization, presence, comments, threads, and notifications.

---

## Permissions

| Role    | Edit | Rename | Share | Remove Collaborators | Delete |
| ------- | :--: | :----: | :---: | :------------------: | :----: |
| Creator |  Yes |   Yes  |  Yes  |          Yes         |   Yes  |
| Editor  |  Yes |   No   |   No  |          No          |   No   |
| Viewer  |  No  |   No   |   No  |          No          |   No   |

Access permissions are enforced through the Liveblocks room access configuration and server-side document ownership checks.

---

## Prerequisites

Before running LiveInk locally, make sure you have:

* Node.js 20+
* npm
* A Clerk application for authentication
* A Liveblocks project for real-time collaboration
* A Sentry project if error monitoring is required

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/harshrajput-0/liveink.git
cd liveink
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root.

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Liveblocks
LIVEBLOCKS_SECRET_KEY=

# Sentry
SENTRY_AUTH_TOKEN=
```

Only configure the variables required by the services you are using.

Do not commit `.env.local` or other environment files containing secrets to the repository.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Available Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start the Next.js development server |
| `npm run build`  | Create a production build            |
| `npm start`      | Start the production server          |
| `npm run lint`   | Run ESLint                           |
| `npm run format` | Format the project with Prettier     |

---

## Production Build

To verify the project builds successfully:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

---

## Deployment

LiveInk can be deployed to platforms that support Next.js, such as Vercel.

When deploying, configure the required environment variables in the hosting provider's project settings rather than committing them to the repository.

For Vercel:

1. Import the repository into Vercel.
2. Select the project root.
3. Add the required environment variables.
4. Deploy.
5. Verify Clerk authentication.
6. Verify Liveblocks authentication and real-time collaboration.
7. Verify Sentry if error monitoring is enabled.

---

## Exporting Documents

From the editor header, the download menu provides two export options.

### PDF

PDF export uses the browser's native print functionality. LiveInk isolates the document content for printing, allowing the browser's **Save as PDF** option to create the PDF.

No additional PDF-generation library is required.

### Word

The Word export creates a `.doc` file from the document's rendered HTML.

It is compatible with:

* Microsoft Word
* Google Docs
* LibreOffice

The generated file is not a true OOXML `.docx` document. A library such as `docx` or `html-to-docx` would be required for native `.docx` generation.

---

## Project Goals

LiveInk is designed to demonstrate how a modern collaborative editor can combine:

* Authentication
* Rich-text editing
* Real-time synchronization
* Presence
* Document permissions
* Sharing
* Threaded discussions
* Mentions
* Notifications
* Document export
* Theme-aware UI
* Error monitoring

The project focuses on keeping the application modular while allowing real-time collaboration features to remain closely integrated with the editor experience.
