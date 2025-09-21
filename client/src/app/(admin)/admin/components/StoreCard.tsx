'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StoreIcon } from "lucide-react"
import Link from "next/link"

function StoreCard({store}: any) { 
  return (
    <Link href={`/admin/${store.id}`}>
        <Card 
            className="hover:opacity-80 hover:cursor-pointer"
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold text-center flex items-center justify-center w-full">
                {store?.name}
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="text semi-bold mx-auto my-auto flex items-center justify-center">
                <StoreIcon size={40}/>
                {/* Performance summary of a store */}
            </div>
            </CardContent>
        </Card>
    </Link>
    
  )
}

export default StoreCard
