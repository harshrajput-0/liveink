# InkSync

InkSync is a real-time collaborative document editor built with Next.js, Lexical, Liveblocks, and Clerk. It allows authenticated users to create documents, edit rich text together in real time, collaborate with other users, manage document permissions, and discuss content through threaded comments.

## Features

- **Authentication** with Clerk
- **Real-time collaborative editing** powered by Liveblocks
- **Rich-text editor** built with Lexical
- **Document management**
  - Create documents
  - Rename documents
  - Delete documents
  - View all accessible documents
  - Search documents by title
  - Toggle between grid and list views
- **Export**
  - Download the current document as a PDF (via the browser's print dialog)
  - Download the current document as a Word file (`.doc`)
- **Collaboration and sharing**
  - Invite users by email
  - Assign `Viewer` or `Editor` permissions
  - Remove collaborators
  - Show active collaborators
- **Comments and threads** with Liveblocks
- **Mentions** with collaborator suggestions
- **Notifications** for comments, mentions, and access changes, with an unread indicator
- **View-only mode** for users without edit permission
- **Responsive UI** using Tailwind CSS and shadcn/Radix components
- **Error monitoring** with Sentry
- **Next.js App Router** architecture
- **TypeScript** throughout the application

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
| Icons                   | Lucide React         |
| Error monitoring        | Sentry               |
| Package manager         | npm                  |

## How Collaboration Works

Each document is represented by a Liveblocks room.

When a document is created, InkSync creates a Liveblocks room with metadata containing the document owner and title. The creator receives write access automatically.

Users can then be invited to the room:

- **Creator** — owns the document and can manage collaborators, rename, and delete the document.
- **Editor** — can edit the document.
- **Viewer** — can read the document and participate in presence/comment-related functionality without editing the document.

Clerk handles user identity, while Liveblocks handles room access, presence, real-time synchronization, comments, and notifications.

## Permissions

| Role    | Edit | Rename | Share | Remove Collaborators | Delete |
| ------- | :--: | :----: | :---: | :------------------: | :----: |
| Creator | Yes  |  Yes   |  Yes  |         Yes          |  Yes   |
| Editor  | Yes  |   No   |  No   |          No          |   No   |
| Viewer  |  No  |   No   |  No   |          No          |   No   |

## Exporting Documents

From the editor toolbar, the download menu offers two formats:

- **PDF** — opens the browser's native print dialog, scoped to just the document content; choosing "Save as PDF" there produces the file. No extra dependencies required.
- **Word (`.doc`)** — downloads the document's rendered HTML as an `application/msword` file. This opens correctly in Word, Google Docs, and LibreOffice, but it is not a true OOXML `.docx` file — for that, a library such as `docx` or `html-to-docx` would need to be added.

## Prerequisites

Before running InkSync locally, make sure you have:

- Node.js 20+ installed
- npm installed
- [Clerk](https://clerk.com/) for authenticaiton
- [Liveblocks](https://liveblocks.io/) for live collaboration
- [Sentry](https://sentry.io/), if you want error monitoring enabled

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/harshrajput-0/inksync.git
cd inksync
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root.

```env
#Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

#Liveblocks
LIVEBLOCKS_SECRET_KEY=

# Sentry
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

Only add the variables required by the services you have configured. Do not commit `.env.local` or other environment files to the repository.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start the Next.js development server |
| `npm run build`  | Create a production build            |
| `npm start`      | Start the production server          |
| `npm run lint`   | Run ESLint                           |
| `npm run format` | Format the project with Prettier     |

## Production Build

To verify the project builds successfully:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Deployment

InkSync can be deployed to platforms that support Next.js, such as Vercel.

When deploying, configure the same environment variables in the hosting provider's project settings rather than committing them to the repository.

For Vercel, the typical deployment flow is:

1. Import the repository into Vercel.
2. Select the project root.
3. Add the required environment variables.
4. Deploy.
5. Verify Clerk authentication and Liveblocks collaboration using the deployed domain.
