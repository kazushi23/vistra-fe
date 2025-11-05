# Document Management System - Frontend

A modern Next.js TypeScript frontend for managing documents (folders and files) with an intuitive interface for file uploads, document browsing, and search functionality.

## Quick Start

### Prerequisites
- Node.js 22
- npm, yarn, pnpm, or bun
- Backend API running on `http://localhost:5001` (see backend README)

### Installation

```bash
# Install dependencies
npm install
```

### Running the Application

#### Development Mode
```bash
npm run dev
```
Application runs on `http://localhost:3000` with hot-reload enabled.

#### Production Mode
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

#### Testing
```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch
```

---

## Features

### Current Implementation
- **View a list of documents and folders**: Implementation mainly in src/components/table
- **Add a new folder**: Implementation mainly in src/components/home/addnewfolder.tsx. Folder name empty check.
- **Add a new file**: Implementation mainly in src/components/home/uploadfilemodal.tsx & filepreview.tsx. Multi-file upload (up to 10 files) with drag-and-drop support, file type validation and file size validation
- **Search**: Implementation mainly in src/components/home/searchbox.tsx. Real-time search across document names (debounce)
- **Pagination**: Implementation mainly in src/components/table > pageselection.tsx, pagesizedropdown.tsx and pagesizeselection.tsx
- **Sorting**: Implementation mainly in src/components/table/list.tsx. Sort by name or updatedAt
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Toast Notifications**: User feedback for success/error states

### File Upload Validation
- **Allowed Types**: PDF, DOCX, XLSX, PNG, JPG, JPEG
- **Max File Size**: 5MB per file
- **Max Files**: 10 files per upload
- **Empty File Detection**: Rejects 0-byte files
- **Real-time Validation**: Client-side checks before API calls

### Folder Create Validation
- **Name**: Required

---

## Project Structure

```
gep-fe/
├── app/
│   ├── page.tsx              # Main documents page
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles
├── components/
│   └── base/
│       ├── button.tsx        # Base button component
│       ├── emptyTable.tsx    # Data table when empty data component
│       └── toast.tsx         # Notification component
│   └── home/
│       ├── addnewfolder.tsx      # Modal to add new folder
│       ├── filepreview.tsx       # Div to show uploaded files
│       ├── heading.tsx           # Home page header component (Document + buttons)
│       ├── searchbox.tsx         # Home page search box component for table
│       └── uploadfilemodal.tsx   # Modal to upload new files
│   └── table/
│       ├── list.tsx              # Data table with sorting
│       ├── listheader.tsx        # Data table <th> component
│       ├── listrow.tsx           # Table row component
│       ├── pageselection.tsx     # Bottom page number selection component
│       ├── pagesizedropdown.tsx  # Bottom page size options component
│       └── pagesizeselection.tsx # Bottom page size dropdown component
├── lib/
│   └── api
│       ├── document.ts           # Api calls to server (list, create folder, create file)
│       └── documentmock.ts       # Mock api for initial development
│   └── mocks
│       └── document.ts           # Mock data for initial development
│   └── static
│       ├── filefolderoptions.ts    # Static file size, file type and file length options
│       ├── icons.ts                # Static icons options
│       └── pagesizeoptions.ts      # Static page size options
│   └──types
│       ├── base.types.ts         # Base types and props
│       ├── document.types.ts     # Document data types and props
│       ├── home.types.ts         # Home page data types and props
│       └── table.types.ts        # Table data types and props
├── utils/
│   ├── date.tsx            # Convert unixmilli utc to date string local
│   └── filesize.tsx        # display file size based on file
├── test/
│   └── page.test.tsx         # Component tests
```

---

## API Integration

### Base Configuration
```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // base backend url from env variables
```

### Endpoints Used

#### Get Documents
```typescript
GET /api/v1/document?page=1&pagesize=10&search=report&sortColumn=name&descending=false

Response:
{
    "type": "Success",
    "message": "Data has been retrieved",
    "count": 2,
    "data": [
        {
            "id": 2,
            "name": "Kazushi Fujiwara Cover Letter 2025 (2).pdf",
            "createdBy": "Kazushi Fujiwara",
            "updatedAt": 1762267268622,
            "size": 35422,
            "type": "file"
        },
        {
            "id": 1,
            "name": "test",
            "createdBy": "Kazushi Fujiwara",
            "updatedAt": 1762267261512,
            "size": 0,
            "type": "folder"
        }
    ]
}
```

#### Create Folder
```typescript
POST /api/v1/folder/create
Content-Type: application/json

{
  "name": "test"
}

Response: 200 Created
{
    "type": "Success",
    "message": "Folder created successfully",
    "count": 0,
    "data": {
        "data": {
            "id": 3,
            "name": "test",
            "createdBy": "Kazushi Fujiwara",
            "updatedAt": 1762267290147,
            "size": 0,
            "type": "folder"
        }
    }
}
```

#### Upload Files
```typescript
POST /api/v1/file/create
Content-Type: multipart/form-data

FormData:
- files: [File, File, ...]

Response: 200 Created
{
    "type": "Success",
    "message": "2 file(s) created successfully",
    "count": 201,
    "data": [
        {
            "id": 4,
            "name": "Kazushi Fujiwara Cover Letter 2025 (2).pdf",
            "createdBy": "Kazushi Fujiwara",
            "updatedAt": 1762267320815,
            "size": 35422,
            "type": "file"
        },
        {
            "id": 5,
            "name": "Kazushi Fujiwara Resume CV 2025 (2).pdf",
            "createdBy": "Kazushi Fujiwara",
            "updatedAt": 1762267320815,
            "size": 120564,
            "type": "file"
        }
    ]
}
```

---

## Component Architecture

### Main Page (`app/page.tsx`)
Central component managing:
- Document fetching with pagination
- Modal state management
- Toast notifications
- Search and sort logic

### DocumentsTable Component
- Responsive table layout
- Sortable columns (name, date)
- Empty state handling
- Auto-adjusting height (no jumps)
- Type badges (folder/file)
- Formatted file sizes (KB, MB)
- Formatted dates (relative time)

### Modal Components
- **CreateFolderModal**: Text input with validation
- **UploadFileModal**: File picker with drag-and-drop
  - Real-time validation feedback
  - File type filtering
  - Multiple file preview
  - Size limit warnings

### Toast System
- Success/error states
- Auto-dismiss (3 seconds)
- Stacked notifications
- Smooth animations

---

## Styling & Design

### Tailwind CSS Configuration
```javascript
// tailwind.config.ts
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
      }
    }
  }
}
```

### Design Principles
- **Mobile-First**: Responsive breakpoints (sm, md, lg, xl)
- **Consistent**: Unified spacing, colors, and typography
- **Performant**: CSS-only animations, optimized re-renders

---

## Testing Strategy

### Test Coverage
```bash
PASS  test/page.test.tsx
DocumentsPage Component
  ✓ renders buttons (61 ms)
  ✓ opens folder modal when Create Folder is clicked (82 ms)
  ✓ opens upload modal when Upload File is clicked (27 ms)
  ✓ shows error toast when folder name is empty (48 ms)
```

### Testing Tools
- **Jest**: Test runner with TypeScript support
- **React Testing Library**: Component testing
- **User Event**: Simulating user interactions
- **MSW**: API mocking (not in this assignment)

### Running Tests
```bash
# Single run with coverage
npm run test -- --coverage

# Watch mode for TDD
npm run test:watch

# Specific test file
npm run test page.test.tsx
```

---

## Environment Variables

### Required Variables
```env
# .env.local
NEXT_PUBLIC_API_BASE_URL="http://localhost:5001"```

### Development vs Production
```bash
# Development (default)
NEXT_PUBLIC_API_BASE_URL="http://localhost:5001"
# Production
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

**Note**: `NEXT_PUBLIC_` prefix exposes variables to browser

---

## Known Limitations & TODOs

### Current Limitations
- **Unique checking**: No duplicate checks for folder and file creation
---

## Troubleshooting

### Common Issues

#### Backend Connection Error
```bash
Error: Failed to fetch documents
Solution: Ensure backend is running on http://localhost:5001
```

#### File Upload Fails
```bash
Error: File too large
Solution: Check file size < 5MB, type is allowed (PDF, DOCX, etc.)
```

#### Build Fails
```bash
Error: Module not found
Solution: Delete .next folder and node_modules, then npm install
```

#### Tests Fail
```bash
Error: Cannot find module 'react'
Solution: npm install, ensure all devDependencies installed
```
---

## Tech Stack

- **Framework:** Next.js 16.0.1 (App Router)
- **Language:** TypeScript 5+
- **UI Library:** React 19.2.0
- **Styling:** Tailwind CSS 4
- **Testing:** Jest 30 + React Testing Library
- **HTTP Client:** Native Fetch API
- **Build Tool:** Turbopack (Next.js built-in)

---

## Related Documentation

- **Backend API**: See `vistra-be/README.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs