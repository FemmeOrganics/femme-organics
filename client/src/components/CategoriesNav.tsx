import getCategories from "@/actions/get-categories"
import MainNav from "@/components/MainNav"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


export const CategoriesNav = async () => {
    const data = await getCategories()
    return <ScrollArea className="bg-slate-100">
    <MainNav data={data.categories}/>
    <ScrollBar orientation="horizontal" />
</ScrollArea>
}