import { ScrollArea } from "@/src/components/ui/scroll-area"

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    
    return(
        <ScrollArea className="h-full min-h-screen py-4">
            {children}
        </ScrollArea>
    )
}
