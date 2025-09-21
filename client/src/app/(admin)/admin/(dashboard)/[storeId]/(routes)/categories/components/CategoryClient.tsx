'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"

import Heading from "@/components/ui/Heading"
import { DataTable } from "@/components/ui/DataTable"
import { CategoryColumn, columns } from "./Columns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "nextjs-toploader/app"

type Props = {
    categories: CategoryColumn[]
}

const CategoryClient = ({ categories }: Props) => {

    const router = useRouter()
    const params = useParams()

    return (
        <div className='h-full'>
            <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50  px-2  py-1">
                <Heading
                    title={`Categories (${categories?.length})`}
                    description="Manage categories for your store"
                />
                <Button onClick={() => {
                    router.push(`/admin/${params.storeId}/categories/new`)
                }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator className="mb-2"/>
            <ScrollArea className='h-full px-2'>
                <div className="bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm">
                    <DataTable columns={columns} data={categories} searchKey="name" />
                </div>
              
            </ScrollArea>
        </div>
    )
}

export default CategoryClient