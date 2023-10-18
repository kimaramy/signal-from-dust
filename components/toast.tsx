"use client"

import { AlertCircle, CheckCircle } from "lucide-react"
import { Toaster } from "react-hot-toast"

export function Toast() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName="rounded"
      // containerStyle={{}}
      toastOptions={{
        // Define default options
        duration: 3000,
        className: "bg-white text-gray-700",
        // Default options for specific status
        success: {
          icon: <CheckCircle className="h-5 w-5 text-green-700" />,
        },
        error: {
          icon: <AlertCircle className="h-5 w-5 text-red-700" />,
        },
      }}
    />
  )
}
