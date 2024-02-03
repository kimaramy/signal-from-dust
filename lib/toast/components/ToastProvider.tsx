'use client';

import { Toaster } from 'react-hot-toast';

import { Icon } from '@/lib/icon';

function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName="rounded"
      // containerStyle={{}}
      toastOptions={{
        // Define default options
        duration: 5000,
        className: 'bg-white text-gray-700 text-sm',
        // Default options for specific status
        success: {
          icon: <Icon.CheckCircle className="h-4 w-4" />,
        },
        error: {
          icon: <Icon.AlertCircle className="h-4 w-4 text-destructive" />,
        },
      }}
    />
  );
}

export default ToastProvider;
