import { useNuiEvent } from '@/hooks/useNuiEvent'
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { defaultTranslations } from './translations'

interface TranslationContextType {
  translate: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType>({
  translate: (key: string) => key,
})

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [translations, setTranslations] = useState<Record<string, string>>(defaultTranslations)
  const translate = (key: string) => {
    return translations[key] || `Key not found for key: ${key}`
  }

  useNuiEvent('setTranslations', (data: any) => {
    const { translations } = JSON.parse(data)
    setTranslations(translations)
  }) 
  
  return (
    <TranslationContext.Provider value={{ translate }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => useContext(TranslationContext)