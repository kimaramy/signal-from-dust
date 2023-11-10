import React from 'react';

interface ErrorBoxProps {
  children: React.ReactNode;
}

function ErrorBox({ children }: ErrorBoxProps) {
  return (
    <div>
      <code className="flex rounded border border-red-500 bg-red-100 p-4 font-mono text-xs text-red-700">
        {children}
      </code>
    </div>
  );
}

export default ErrorBox;
