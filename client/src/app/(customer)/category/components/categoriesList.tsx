"use client"
import type { GetCategoriesQuery, GetCategoryQuery } from "@/__gql__/graphql";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Heading from "@/src/components/ui/Heading";
import { useCategoryStore } from "../store";
import { cn } from "@/src/lib/utils";
import { Container } from "@/src/components/ui/Container";

export function CategoriesList({ categories, headingClassName }: { categories: GetCategoriesQuery["categories"], headingClassName?: string }) {
  const categoryStore = useCategoryStore()
  return (
    <Container>
      <Heading title="Shop By Category" description="" className={headingClassName}/>

      <ScrollArea className="w-full">
        <div className="w-full my-2 space-x-2">
          {categories?.map((category) => (
            <Button 
              className={cn(category?.name === categoryStore.category?.name ? "bg-black text-white" : "", " px-0")} 
              key={category?.id} type="button" variant={"secondary"} 
              onClick={() => {categoryStore.setCategory(category as unknown as GetCategoryQuery["category"])}}
            >
              {category?.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Container>
  );
}
