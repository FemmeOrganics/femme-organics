import NoResults from "@/components/ui/No-Results";
import { Container } from "@/src/components/ui/Container";
import { ProductList } from "@/src/components/ProductList";
import { getClient } from "@/src/lib/graphql/ApolloClient";
import { type GetProductQuery, GetProductsByCategoryDocument } from "@/__gql__/graphql";

interface CategoryPageProps {
    params: {
        categoryId: string;
    }
    searchParams: {
        colorId: string;
        sizeId: string;
    }

}
async function CategoryPage({params, searchParams}: CategoryPageProps) {
   
    const { data } = await getClient().query({
        query: GetProductsByCategoryDocument,
        variables: {
            categoryId: Number.parseInt(params.categoryId)
        }
    });

    const products = data?.productsByCategory

    return (
        <Container className="h-full">
            {products?.length === 0 && <NoResults/>}
            <ProductList items={products as GetProductQuery["product"][]} title={products ? products[0]?.category.name : ""}/>
        </Container>
    )
}

export default CategoryPage
