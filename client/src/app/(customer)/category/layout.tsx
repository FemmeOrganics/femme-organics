import { ScrollArea } from "@/src/components/ui/scroll-area"
import { getClient } from "@/src/lib/graphql/ApolloClient"
import { GetCategoriesDocument } from "@/__gql__/graphql"
import { CategoriesList } from "@/src/components/category-list"

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    const {data} = await getClient().query({query: GetCategoriesDocument})
    const categories = data.categories
    
    return(
        <ScrollArea className="h-full min-h-screen py-4">
            <CategoriesList categories={categories} />
            {children}
        </ScrollArea>
    )
}
