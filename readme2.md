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
- **Document Listing**: View all folders and files in a responsive table
- **Create Folders**: Modal-based folder creation with validation
- **Upload Files**: Multi-file upload (up to 10 files) with drag-and-drop support, file type validation and file size validation
- **Search**: Real-time search across document names (debounce)
- **Pagination**: Navigate through large document collections
- **Sorting**: Sort by name or updatedAt
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Toast Notifications**: User feedback for success/error states
- **Loading States**: Visual indicators for async operations

### File Upload Validation
- **Allowed Types**: PDF, DOCX, XLSX, PNG, JPG, JPEG
- **Max File Size**: 5MB per file
- **Max Files**: 10 files per upload
- **Empty File Detection**: Rejects 0-byte files
- **Real-time Validation**: Client-side checks before API calls

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
│       ├── button.tsx    # Data table with sorting
│       ├── emptyTable.tsx    # Data table with sorting
│       └── toast.tsx             # Notification component
│   └── home/
│       ├── addnewfolder.tsx    # Data table with sorting
│       ├── filepreview.tsx    # Data table with sorting
│       ├── heading.tsx    # Data table with sorting
│       ├── searchbox.tsx    # Data table with sorting
│       └── uploadfilemodal.tsx             # Notification component
│   └── table/
│       ├── list.tsx    # Data table with sorting
│       ├── listheader.tsx    # Data table with sorting
│       ├── listrow.tsx    # Data table with sorting
│       ├── pageselection.tsx    # Data table with sorting
│       ├── pagesizedropdown.tsx    # Data table with sorting
│       └── pagesizeselection.tsx             # Notification component
├── lib/
│   └── api
│       ├── document.ts    # Data table with sorting
│       └── documentmock.ts            # Notification component
│   └── mocks
│       └── document.ts             # Notification component
│   └── static
│       ├── filefolderoptions.ts    # Data table with sorting
│       ├── icons.ts    # Data table with sorting
│       └── pagesizeoptions.ts             # Notification component
│   └──types
│       ├── base.types.ts    # Data table with sorting
│       ├── document.types.ts    # Data table with sorting
│       ├── home.types.ts    # Data table with sorting
│       └── table.types.ts             # Notification component
│   ├── api.ts                # API client functions
│   ├── types.ts              # TypeScript interfaces
│   └── utils.ts              # Helper functions
├── utils/
│   ├── date.tsx
│   └── filesize.tsx
├── test/
│   ├── page.test.tsx         # Component tests
│   └── setup.ts              # Jest configuration
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies & scripts
```

---

## API Integration

### Base Configuration
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const API_VERSION = 'v1';
```

### Endpoints Used

#### Get Documents
```typescript
GET /api/v1/document?page=1&pagesize=10&search=report&sortColumn=name&descending=false

Response:
{
  "documents": [
    {
      "id": 1,
      "name": "report.pdf",
      "type": "file",
      "size": 1024000,
      "createdBy": "system",
      "createdAt": 1699564800000,
      "updatedAt": 1699564800000
    }
  ],
  "total": 1,
  "page": 1,
  "pagesize": 10
}
```

#### Create Folder
```typescript
POST /api/v1/folder/create
Content-Type: application/json

{
  "name": "Project Documents"
}

Response: 200 Created
{
  "id": 2,
  "name": "Project Documents",
  "type": "folder",
  ...
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
  "created": [
    {
      "id": 3,
      "name": "document.pdf",
      "type": "file",
      ...
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
- Sortable columns (name, type, size, date)
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
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
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
- **MSW**: API mocking (planned)

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

## Architecture Decisions

### Why Next.js?
- **Server Components**: Reduced client-side JavaScript
- **App Router**: Modern routing with layouts
- **Built-in Optimization**: Image, font, and bundle optimization
- **TypeScript First**: Excellent type safety
- **API Routes**: Optional backend integration (not used currently)

### Why Client-Side State Management?
- **Simplicity**: No Redux/Zustand overhead for small app
- **React Hooks**: `useState`, `useEffect` sufficient
- **Future**: Consider Zustand if state complexity grows

### Why No React Query?
- **Simple Data Flow**: Direct API calls with `fetch`
- **Manual Cache Control**: Refresh after mutations
- **Future**: Add React Query for:
  - Automatic caching
  - Background refetching
  - Optimistic updates

### Why Tailwind CSS?
- **Utility-First**: Rapid development
- **No CSS Files**: Styles colocated with components
- **Purging**: Unused styles removed in production
- **Consistency**: Design system via config

---

## Environment Variables

### Required Variables
```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### Development vs Production
```bash
# Development (default)
NEXT_PUBLIC_API_URL=http://localhost:5001

# Production
NEXT_PUBLIC_API_URL=https://api.example.com
```

**Note**: `NEXT_PUBLIC_` prefix exposes variables to browser

---

## Performance Optimizations

### Current Optimizations
- **Image Optimization**: Next.js automatic image optimization
- **Font Optimization**: Geist font with `next/font`
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code removal

### Future Improvements
- [ ] Implement virtual scrolling for large document lists
- [ ] Add service worker for offline support
- [ ] Optimize bundle size with dynamic imports
- [ ] Add CDN caching for static assets
- [ ] Implement progressive image loading

---

## Known Limitations & TODOs

### Current Limitations
- **No Document Selection**: Cannot select multiple documents
- **No Bulk Actions**: Delete, move, download
- **No Document Preview**: Click to preview files
- **No Drag-and-Drop Upload**: Only file picker
- **No Folder Navigation**: Flat structure only

### TODO List
```markdown
# High Priority
- [ ] Add validation error messages from backend
- [ ] Implement loading icon for table data
- [ ] Handle backend error messages properly
- [ ] Add TypeScript strict mode
- [ ] Add comprehensive JSDoc comments

# Medium Priority
- [ ] Single and multi-select for documents
- [ ] Responsive table improvements
- [ ] Drag-and-drop file upload
- [ ] Document preview modal
- [ ] Download functionality

# Low Priority
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements (WCAG 2.1 AA)
- [ ] Internationalization (i18n)
```

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

## Browser Support

### Supported Browsers
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Required Features
- ES2020 JavaScript
- CSS Grid & Flexbox
- File API
- Fetch API
- WebP images (with fallback)

---

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in dashboard
NEXT_PUBLIC_API_URL=https://your-api.com
```

### Docker
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export (GitHub Pages)
```javascript
// next.config.js
module.exports = {
  output: 'export',
  images: { unoptimized: true }
}
```

---

## Contributing

### Code Style
- Use TypeScript for all files
- Follow ESLint rules
- Use Prettier for formatting
- Write tests for new features

### Commit Convention
```bash
feat: Add document preview modal
fix: Resolve file upload validation bug
docs: Update README with deployment steps
test: Add integration tests for API calls
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

- **Backend API**: See `backend/README.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

---

## Author

**Kazushi Fujiwara**

For questions or clarifications about implementation decisions, please reach out.

---

## License

Private project - All rights reserved