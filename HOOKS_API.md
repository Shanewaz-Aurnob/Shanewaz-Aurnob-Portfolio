# Custom Hooks Documentation

## Overview

This document provides detailed API documentation for all custom hooks used in the portfolio.

## useClipboard

Manages clipboard copy functionality with automatic fallback mechanism.

### Type Signature
```typescript
interface UseClipboardReturn {
  isCopied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
}

const useClipboard: () => UseClipboardReturn;
```

### Parameters
None

### Returns
- `isCopied` (boolean): Whether the last copy was successful
- `copyToClipboard` (function): Async function to copy text to clipboard

### Features
- Modern Clipboard API with fallback to `document.execCommand`
- Automatic state reset after 2 seconds
- Error handling and console logging

### Example Usage
```typescript
import { useClipboard } from './hooks';

const EmailSection = ({ email }) => {
  const { isCopied, copyToClipboard } = useClipboard();

  return (
    <button onClick={() => copyToClipboard(email)}>
      {isCopied ? 'Copied!' : 'Copy Email'}
    </button>
  );
};
```

---

## useModal

Manages modal/dialog state with content management.

### Type Signature
```typescript
interface ModalState {
  isOpen: boolean;
  title: string;
  image?: string;
  description?: string;
}

interface UseModalReturn {
  modalContent: ModalState;
  openModal: (title: string, image?: string, description?: string) => void;
  closeModal: () => void;
}

const useModal: (initialState?: Partial<ModalState>) => UseModalReturn;
```

### Parameters
- `initialState` (optional): Initial modal state overrides

### Returns
- `modalContent` (ModalState): Current modal state
- `openModal` (function): Opens modal with provided content
- `closeModal` (function): Closes the modal

### Features
- Type-safe content management
- Callbacks are memoized for performance
- Supports optional initial state

### Example Usage
```typescript
import { useModal } from './hooks';

const GalleryPage = () => {
  const { modalContent, openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={() => openModal('Title', '/image.jpg', 'Description')}>
        View Image
      </button>

      {modalContent.isOpen && (
        <Modal onClose={closeModal}>
          <h2>{modalContent.title}</h2>
          <img src={modalContent.image} alt={modalContent.title} />
          <p>{modalContent.description}</p>
        </Modal>
      )}
    </>
  );
};
```

---

## useViewportSync

Handles viewport changes with page reload on mobile/desktop transitions.

### Type Signature
```typescript
const useViewportSync: () => void;
```

### Parameters
None

### Returns
Nothing (side effect hook)

### Features
- Detects viewport type changes (mobile < 768px, desktop >= 768px)
- Saves scroll position before reload
- Restores scroll position after reload
- Debounced resize listener (250ms)
- Automatic cleanup on unmount

### Example Usage
```typescript
import { useViewportSync } from './hooks';

const App = () => {
  useViewportSync(); // Call once at app level

  return (
    <div>
      {/* App content */}
    </div>
  );
};
```

---

## useKeyboard

Registers keyboard event handlers dynamically.

### Type Signature
```typescript
type KeyboardCallback = (e: KeyboardEvent) => void;

interface KeyboardHandlers {
  [key: string]: KeyboardCallback;
}

const useKeyboard: (handlers: KeyboardHandlers) => void;
```

### Parameters
- `handlers` (object): Key-handler mappings

### Returns
Nothing (side effect hook)

### Features
- Registers multiple keyboard handlers
- Automatic cleanup on unmount
- Dynamic handler updates

### Example Usage
```typescript
import { useKeyboard } from './hooks';

const ModalComponent = ({ onClose }) => {
  useKeyboard({
    'Escape': onClose,
    'Enter': () => console.log('Enter pressed'),
    'ArrowUp': () => console.log('Up arrow')
  });

  return <div>{/* Modal content */}</div>;
};
```

### Common Key Patterns
```typescript
{
  'Escape': handler,      // ESC key
  'Enter': handler,       // Enter key
  'ArrowUp': handler,     // Up arrow
  'ArrowDown': handler,   // Down arrow
  'ArrowLeft': handler,   // Left arrow
  'ArrowRight': handler,  // Right arrow
  ' ': handler,           // Spacebar
  'Control': handler,     // Ctrl key
  'Shift': handler,       // Shift key
  'Alt': handler,         // Alt key
  'a': handler,           // Letter 'a'
  '1': handler            // Number '1'
}
```

---

## useDownload

Provides file download functionality by creating download links.

### Type Signature
```typescript
interface UseDownloadReturn {
  downloadFile: (url: string, filename: string) => void;
}

const useDownload: () => UseDownloadReturn;
```

### Parameters
None

### Returns
- `downloadFile` (function): Memoized function to download files

### Features
- Creates anchor element dynamically
- Automatic cleanup after download
- Works with data URLs and file paths
- Memoized for performance

### Example Usage
```typescript
import { useDownload } from './hooks';

const ResumeSection = () => {
  const { downloadFile } = useDownload();

  const handleDownload = () => {
    downloadFile('/resume/resume.pdf', 'MyResume.pdf');
  };

  return (
    <button onClick={handleDownload}>
      Download Resume
    </button>
  );
};
```

### Supported File Types
- Documents: `.pdf`, `.doc`, `.docx`, `.txt`
- Images: `.jpg`, `.png`, `.gif`, `.svg`
- Archives: `.zip`, `.rar`, `.7z`
- Spreadsheets: `.xlsx`, `.csv`
- Any other file available via URL

---

## Hook Composition Example

Using multiple hooks together:

```typescript
import React from 'react';
import { useClipboard, useModal, useKeyboard, useDownload } from './hooks';

interface ContactProps {
  email: string;
  resumeUrl: string;
}

const ContactSection: React.FC<ContactProps> = ({ email, resumeUrl }) => {
  const { isCopied, copyToClipboard } = useClipboard();
  const { modalContent, openModal, closeModal } = useModal();
  const { downloadFile } = useDownload();

  useKeyboard({
    'Escape': closeModal,
    'c': () => copyToClipboard(email),
    'd': () => downloadFile(resumeUrl, 'Resume.pdf')
  });

  return (
    <div>
      {/* Email */}
      <button onClick={() => copyToClipboard(email)}>
        {isCopied ? '✓ Copied' : 'Copy Email'}
      </button>

      {/* Resume */}
      <button onClick={() => downloadFile(resumeUrl, 'Resume.pdf')}>
        Download Resume
      </button>

      {/* Modal */}
      <button onClick={() => openModal('Success', undefined, 'Email copied!')}>
        Show Message
      </button>

      {modalContent.isOpen && (
        <Modal onClose={closeModal}>
          <h2>{modalContent.title}</h2>
          <p>{modalContent.description}</p>
        </Modal>
      )}

      {/* Keyboard hints */}
      <small>
        <p>Keyboard shortcuts:</p>
        <ul>
          <li>C - Copy email</li>
          <li>D - Download resume</li>
          <li>ESC - Close modal</li>
        </ul>
      </small>
    </div>
  );
};

export default ContactSection;
```

---

## Testing Hooks

### Testing useClipboard
```typescript
import { renderHook, act } from '@testing-library/react';
import { useClipboard } from './hooks/useClipboard';

describe('useClipboard', () => {
  it('copies text to clipboard', async () => {
    const { result } = renderHook(() => useClipboard());

    act(() => {
      result.current.copyToClipboard('test text');
    });

    await waitFor(() => {
      expect(result.current.isCopied).toBe(true);
    });
  });
});
```

### Testing useModal
```typescript
import { renderHook, act } from '@testing-library/react';
import { useModal } from './hooks/useModal';

describe('useModal', () => {
  it('opens and closes modal', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal('Test', '/img.jpg', 'Desc');
    });

    expect(result.current.modalContent.isOpen).toBe(true);
    expect(result.current.modalContent.title).toBe('Test');

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.modalContent.isOpen).toBe(false);
  });
});
```

---

## Migration Guide

### From Old Copy Logic
```typescript
// Before
const copyToClipboard = (text, setCopied, setShowToast) => {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(true);
    setShowToast(true);
    setTimeout(() => setCopied(false), 2000);
  });
};

// After
const { isCopied, copyToClipboard } = useClipboard();
copiedEmail ? <Button>✓ Copied</Button> : <Button>Copy</Button>
```

### From Inline Modal State
```typescript
// Before
const [modalOpen, setModalOpen] = useState(false);
const [modalTitle, setModalTitle] = useState('');
const [modalImage, setModalImage] = useState('');

// After
const { modalContent, openModal, closeModal } = useModal();
openModal('Title', '/image.jpg');
```

---

## Best Practices

1. **Always destructure hook returns** for clarity
2. **Use dependency arrays carefully** in composed hooks
3. **Test hooks in isolation** with renderHook
4. **Memoize callbacks** if passing to child components
5. **Clean up side effects** properly in cleanup functions
6. **Type hooks properly** with TypeScript interfaces
7. **Document hook behavior** with JSDoc comments
8. **Avoid infinite loops** from missing dependencies

---

## Troubleshooting

### Issue: Hook called conditionally
**Error**: Rules of Hooks violation

**Solution**: Always call hooks at top level
```typescript
// ❌ Don't
if (condition) {
  const data = useModal();
}

// ✅ Do
const { modalContent } = useModal();
if (condition) {
  // Use modal
}
```

### Issue: Copied state not resetting
**Error**: Button stays in copied state

**Solution**: Verify hook is memoizing correctly
```typescript
const { isCopied, copyToClipboard } = useClipboard();
// isCopied should auto-reset after 2 seconds
```

### Issue: Download not working
**Error**: File not downloading

**Solution**: Check file path and permissions
```typescript
// ✅ Valid paths
downloadFile('/public/file.pdf', 'file.pdf');
downloadFile('https://example.com/file.pdf', 'file.pdf');
downloadFile('data:text/plain;base64,SGVsbG8=', 'file.txt');
```

---

## Contributing New Hooks

When creating new hooks:

1. Place in `src/hooks/useMyHook.ts`
2. Export from `src/hooks/index.ts`
3. Add TypeScript interfaces
4. Document parameters and returns
5. Include usage examples
6. Add tests
7. Update this documentation
