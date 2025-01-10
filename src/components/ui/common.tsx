// src/components/ui/common.tsx
export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        {...props}
      >
        {children}
      </button>
    );
  }
  
  // Add more common UI components as needed