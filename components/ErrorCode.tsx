import React from 'react';

interface ErrorCodeProps {
  text: string;
}

function ErrorCode({ text }: ErrorCodeProps) {
  return (
    <div>
      <code className="flex rounded border border-red-500 bg-red-100 p-4 font-mono text-xs text-red-700">
        {text}
      </code>
    </div>
  );
}

export default ErrorCode;
