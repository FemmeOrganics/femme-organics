import SidePanel from "./components/SidePanel"
export default function RootLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <div className="w-full h-full flex flex-row">
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}