"use client"
import type { GetCategoriesQuery } from "@/__gql__/graphql";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Heading from "@/src/components/ui/Heading";
import Link from "next/link";
import { Container } from "./ui/Container";

export function CategoriesList({ categories, headingClassName }: { categories: GetCategoriesQuery["categories"], headingClassName?: string }) {
  return (
    <Container className=" pb-1 space-y-2 mx-auto w-full bg-slate-100">
      <Heading title="Shop By Category" description="" className={headingClassName}/>
      <ScrollArea className="w-full">
        <div className="w-full space-x-2 h-fit py-1">
          {categories?.map((category) => (
            <Link
              key={category?.id}
              href={`/category/${category?.id} `}
              className=" font-semibold rounded-full border  px-2 py-1"
            >
              {category?.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Container>
  );
}
