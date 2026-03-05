import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Mantieni i dati in cache per 5 minuti
      staleTime: 1000 * 60 * 5,
      // Mantieni i dati in cache anche quando non utilizzati per 10 minuti
      gcTime: 1000 * 60 * 10,
      // Riprova in caso di errore
      retry: 2,
      // Intervallo di retry progressivo
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    },
    mutations: {
      // Riprova una volta in caso di errore per le mutazioni
      retry: 1
    }
  }
})
