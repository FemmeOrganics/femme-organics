"use client";
import NoResults from "@/components/ui/No-Results";
import {ProductCard} from "@/components/ui/Product-Card";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { GetProductQuery } from "@/__gql__/graphql";

type ProductListProps = {
  data: GetProductQuery["product"][] | [];
  loading: boolean; //  isFetching, isLoading, isPending
  orientation?: "horizontal" | "vertical";
  pagination?: {
    paginate?: boolean;
    paginationCount?: number;
    handlePrev: () => void;
    handleNext: () => void;
    currentPage?: number;
  };
};
export function ProductList({
  data,
  loading,
  orientation = "vertical",
  pagination = {
    paginate: false,
    paginationCount: 12,
    handlePrev: () => {},
    handleNext: () => {},
  },
}: ProductListProps) {


  return (
    <ScrollArea className="w-full pb-3 h-fit">
      {loading ? (
        <div
          className={cn(
            "w-full",
            orientation === "horizontal"
              ? "flex flex-row space-x-2"
              : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-start max-w-6xl mx-auto",
          )}
        >
          {Array.from(new Array(pagination.paginationCount).keys()).map((i) => (
            <Skeleton className="h-[280px] w-[180px]" key={i} />
          ))}
        </div>
      ) : data?.length ? (
        <div
          className={cn(
            "w-full",
            orientation === "horizontal"
              ? "flex flex-row space-x-2"
              : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-start max-w-6xl mx-auto",
          )}
        >
          {data?.map((product) => (
            <div key={product.id} className="w-fit h-fit ">
              <ProductCard  data={product} />
            </div>
          ))}
        </div>
      ) : (
        <NoResults />
      )}
      <ScrollBar orientation={orientation} />
    </ScrollArea>
  );
}
