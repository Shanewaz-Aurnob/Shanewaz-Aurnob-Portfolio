# React Best Practices & Guidelines

## Component Guidelines

### 1. Always Use Functional Components

❌ **Don't**
```typescript
class MyComponent extends React.Component {
  render() {
    return <div>...</div>;
  }
}
```

✅ **Do**
```typescript
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>...</div>;
};
```

### 2. Proper TypeScript Typing

❌ **Don't**
```typescript
const MyComponent = ({ prop }: any) => {
  // No type safety
};
```

✅ **Do**
```typescript
interface MyComponentProps {
  prop: string;
  onCallback?: (value: string) => void;
  children?: React.ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({ prop, onCallback, children }) => {
  // Full type safety
};
```

### 3. Use Custom Hooks for Logic

❌ **Don't** - Logic in component
```typescript
const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data').then(res => setData(res));
  }, []);

  return <div>{data}</div>;
};
```

✅ **Do** - Extract to custom hook
```typescript
const useFetchData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data').then(res => setData(res));
  }, []);

  return data;
};

const MyComponent = () => {
  const data = useFetchData();
  return <div>{data}</div>;
};
```

### 4. Memo Components for Performance

❌ **Don't** - Rerender unnecessarily
```typescript
const MyCard = ({ title, description }) => {
  return <div>{title} - {description}</div>;
};
```

✅ **Do** - Memoize when appropriate
```typescript
interface MyCardProps {
  title: string;
  description: string;
}

const MyCard = React.memo<MyCardProps>(({ title, description }) => {
  return <div>{title} - {description}</div>;
});
```

### 5. useCallback for Event Handlers

❌ **Don't**
```typescript
const handleClick = () => {
  // New function created on every render
};
```

✅ **Do**
```typescript
const handleClick = useCallback(() => {
  // Same function instance unless dependencies change
}, [dependencies]);
```

## Hooks Guidelines

### 1. Hook Dependencies

❌ **Don't** - Missing dependencies
```typescript
useEffect(() => {
  someFunction(dependency);
}, []); // Missing 'dependency'
```

✅ **Do** - All dependencies included
```typescript
useEffect(() => {
  someFunction(dependency);
}, [dependency]); // Correct
```

### 2. Custom Hook Naming

❌ **Don't**
```typescript
const fetchData = () => {...}  // Not clearly a hook
```

✅ **Do**
```typescript
const useFetchData = () => {...}  // Clearly a hook
```

### 3. Multiple useStates vs useReducer

❌ **Don't** - Too many useStates
```typescript
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [age, setAge] = useState(0);
const [company, setCompany] = useState('');
```

✅ **Do** - Use useReducer for related state
```typescript
const [formData, dispatch] = useReducer((state, action) => {
  switch(action.type) {
    case 'SET_NAME': return {...state, name: action.payload};
    case 'SET_EMAIL': return {...state, email: action.payload};
    // ...
    default: return state;
  }
}, initialState);
```

## Data Separation Guidelines

### 1. Keep Data in`data/` Folder

❌ **Don't** - Data in components
```typescript
// components/MyComponent.tsx
const data = [{...}, {...}];
```

✅ **Do** - Data in dedicated folder
```typescript
// data/portfolioData.ts
export const myData = [{...}, {...}];

// components/MyComponent.tsx
import { myData } from '../data/portfolioData';
```

### 2. API Calls in Hooks or Services

❌ **Don't** - API calls in components
```typescript
const MyComponent = () => {
  useEffect(() => {
    fetch('/api/data').then(...);
  }, []);
};
```

✅ **Do** - Extract to hook
```typescript
// hooks/useFetchData.ts
export const useFetchData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/data').then(setData);
  }, []);
  return data;
};
```

## File Organization

### Component File Structure
```typescript
// Imports
import React from 'react';
import { motion } from 'framer-motion';

// Types
interface MyComponentProps {
  title: string;
  onClose: () => void;
}

// Component
const MyComponent: React.FC<MyComponentProps> = ({ title, onClose }) => {
  const [state, setState] = React.useState(false);

  const handleClick = React.useCallback(() => {
    // Logic
  }, []);

  return (
    <div>
      {title}
    </div>
  );
};

// Export
export default MyComponent;
```

## Performance Checklist

- [ ] Used React.memo for expensive components
- [ ] Used useCallback for event handlers passed as props
- [ ] Used useMemo for expensive computations
- [ ] Checked dependency arrays are correct
- [ ] No infinite loops or unnecessary rerenders
- [ ] Images optimized or lazy loaded
- [ ] Code splitting implemented for large sections
- [ ] Used useTransition for non-critical updates

## Accessibility Checklist

- [ ] Semantic HTML used (button, nav, main, etc.)
- [ ] ARIA labels for complex components
- [ ] Keyboard navigation support
- [ ] Color contrast meets WCAG standards
- [ ] Focus management in modals
- [ ] Error messages clearly associated with inputs
- [ ] Alt text for images
- [ ] Form labels properly associated

## Testing Checklist

```typescript
// Example test structure
import { render, screen, userEvent } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders with title', () => {
    render(<MyComponent title="Test" onClose={() => {}} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClose when button clicked', async () => {
    const handleClose = jest.fn();
    render(<MyComponent title="Test" onClose={handleClose} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClose).toHaveBeenCalled();
  });
});
```

## Common Mistakes to Avoid

### 1. Not Cleaning Up Side Effects
```typescript
// ❌ Don't
useEffect(() => {
  window.addEventListener('scroll', handler);
}, []); // Memory leak!

// ✅ Do
useEffect(() => {
  window.addEventListener('scroll', handler);
  return () => window.removeEventListener('scroll', handler);
}, []);
```

### 2. Setting State in Render
```typescript
// ❌ Don't
const MyComponent = () => {
  const [count, setCount] = useState(0);
  setCount(count + 1); // Infinite loop!
  return <div>{count}</div>;
};
```

### 3. Missing Key Props in Lists
```typescript
// ❌ Don't
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))} // When list changes, keys become unreliable

// ✅ Do
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))} // Stable, unique key
```

### 4. Using Refs Unnecessarily
```typescript
// ❌ Don't use Ref when state works
const MyComponent = () => {
  const count = useRef(0);
  return <button onClick={() => count.current++}>{count.current}</button>;
};

// ✅ Do use State
const MyComponent = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

## Code Style Guidelines

### Naming Conventions
- Components: PascalCase (`MyComponent`)
- Hooks: camelCase with `use` prefix (`useMyHook`)
- Variables/functions: camelCase (`myVariable`, `myFunction`)
- Constants: UPPER_SNAKE_CASE (`MAX_SIZE`)
- Interfaces/Types: PascalCase (`MyComponentProps`)

### Line Length
- Keep lines under 100 characters
- Break long JSX into multiple lines
- One prop per line for multi-prop elements

### Imports Organization
```typescript
// 1. React and external libraries
import React from 'react';
import { motion } from 'framer-motion';

// 2. Internal components
import { Section } from './shared';

// 3. Custom hooks
import { useModal } from '../hooks';

// 4. Data and utilities
import { portfolioData } from '../data';
import { formatDate } from '../utils';

// 5. Types
import type { MyComponentProps } from '../types';
```

## Conclusion

Following these guidelines ensures:
- 🎯 More maintainable code
- ⚡ Better performance
- 🐛 Fewer bugs
- 👥 Team consistency
- 🚀 Easier scaling
