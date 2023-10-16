"use client"

import { useState } from "react"
import { SupabaseError, SupabaseErrorSchema } from "@/domains"
import {
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import toast from "react-hot-toast"

type QueryClientProviderProps = {
  children: React.ReactNode
}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          suspense: true,
          useErrorBoundary: true,
          retry: false,
          refetchOnWindowFocus: false,
        },
      },
      queryCache: new QueryCache({
        onError(unknownError, query) {
          let errorMessage =
            (query.meta?.errorMessage as string) ??
            (unknownError as Error)?.message ??
            ""

          const isSupabaseError =
            SupabaseErrorSchema.safeParse(unknownError).success

          if (isSupabaseError) {
            const { error } = unknownError as SupabaseError
            errorMessage = `[${error.code}] ${error.message}`
          }

          toast.error(errorMessage)
        },
      }),
    })
  )

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryClientProvider>
  )
}
