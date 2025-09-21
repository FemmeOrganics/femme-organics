'use client'
import {ThemeProvider} from 'next-themes'

// for theme
function CustomThemeProvider({ children, }: { children: React.ReactNode }) {
    return (
        <ThemeProvider  enableSystem={false} attribute="class">{children}</ThemeProvider>
    )
}

export default CustomThemeProvider