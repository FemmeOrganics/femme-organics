'use client'

import { Billboard } from '@/components/Billboard'
import { Container } from '@/components/ui/Container'
import { ProductList } from '@/src/components/ProductListV2'
import { GetBillboardsDocument, GetCategoriesDocument, GetProductsWithCategoryDocument, type GetProductQuery } from '@/__gql__/graphql'
import { Section } from '@/src/components/Section'
import { CategoriesList } from '@/src/components/category-list'
import { useSuspenseQuery } from '@apollo/client'

function HomePage() {
  const { data: billboardData } = useSuspenseQuery(GetBillboardsDocument, {
    variables: { storeId: 1 },
  });

  const { data: categoriesData } = useSuspenseQuery(GetCategoriesDocument);

  const { data: prodData } = useSuspenseQuery(GetProductsWithCategoryDocument);

  const categories = categoriesData?.categories ?? [];
  const billboards = billboardData?.billboards ?? [];
  const productsWithCategory = prodData?.productsWithCategory ?? [];

  return (
    <div className="h-full w-full py-2 flex flex-col space-y-2 text-gray-800">
      {!!billboards.length && <Billboard billboards={billboards} />}
      {!!categories.length && (
        <CategoriesList
          categories={categories}
          headingClassName="text-[18px] text-gray-800"
        />
      )}
      <Container className="h-fit relative max-w-full md:max-w-7xl px-1 md:px-2 lg:px-20">
        {productsWithCategory?.map(
          (category) =>
            category?.categoryName && (
              <Section
                key={category?.categoryName}
                title={category?.categoryName ?? ''}
                categoryId={category?.categoryId}
              >
                <ProductList
                  data={
                    (category?.products as unknown as GetProductQuery['product'][]) ?? []
                  }
                  loading={false}
                  orientation="horizontal"
                />
              </Section>
            )
        )}
      </Container>
      <div className="h-5" />
    </div>
  )
}

export default HomePage
