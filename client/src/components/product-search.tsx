"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useLazyQuery } from "@apollo/client";
import {
  ProductSearchDocument,
  type ProductSearchQuery,
} from "@/__gql__/graphql";
import { ArrowLeft, SearchIcon } from "lucide-react";
import Image from "next/image";
//@ts-ignore
import noImage from "@/app/assets/no-image.jpeg";
import Link from "next/link";
import { Button } from "./ui/button";

export const ProductSearch = () => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [searchString, setSearchString] = useState("");
  const [products, setProducts] =
    useState<ProductSearchQuery["productSearch"]>([]);
  const [getProducts, { loading, error, data }] = useLazyQuery(
    ProductSearchDocument,
    {
      fetchPolicy: "no-cache",
    }
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (url && linkRef.current) {
      linkRef.current.click();
    }
  }, [url]);

  useEffect(() => {
    if (data?.productSearch) {
      setProducts(data.productSearch);
    }
  }, [data?.productSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setProducts([]); 
        setSearchString("")
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex-1">
      <div className="w-full items-center relative max-w-[500px] mx-auto">
        <Link href={url ?? ""} ref={linkRef} />
        <div className="absolute left-2 top-[25%]">
          {searchString ? (
            <ArrowLeft
              size={20}
              onClick={() => setSearchString("")}
              className="hover:text-green-500 text-green-600 cursor-pointer"
            />
          ) : (
            <SearchIcon size={20} />
          )}
        </div>
        <Input
          className="focus-visible:ring-0 text-ellipsis pl-8 w-full"
          placeholder="Search for product"
          ref={inputRef}
          onFocus={() => {
            if (searchString.length > 2) {
              getProducts({
                variables: { page: 0, limit: 7, text: searchString },
              });
            } else {
              setProducts([]);
            }
          }}
          type="text"
          value={searchString}
          onChange={(e) => {
            e.preventDefault();
            const value = e.target.value;
            setSearchString(value);
            if (value.length > 2) {
              getProducts({
                variables: { page: 0, limit: 7, text: value },
              });
            } else {
              setProducts([]);
            }
          }}
        />
      </div>

      <div
        className="relative z-20 mx-auto w-full"
        ref={searchContainerRef}
      >
        {!products?.length && !!searchString.length && !loading && <div className="my-4 p-2 flex items-center justify-between gap-3 absolute top-0 left-0 right-0 mx-auto w-full max-w-[500px] shadow-md bg-slate-200 rounded-md">
           <p>No products results for <em>{searchString}</em></p>  
          </div>}
        {products?.map((item) => (
          <div
            key={item?.id}
            className="my-3 p-2 flex items-center justify-between gap-3 absolute top-0 left-0 right-0 mx-auto w-full max-w-[500px] shadow-md bg-slate-200 rounded-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CBD5E1] bg-[#fefefe]">
                <Image
                  alt={item?.images[0]?.url ?? ""}
                  className="h-10 w-10 rounded-full object-cover"
                  height={36}
                  width={36}
                  src={item?.images[0]?.url ?? noImage}
                />
              </div>
              <p className="text-xs capitalize text-black md:text-sm line-clamp-1">
                {item?.name}
              </p>
            </div>
            <div className="max-w-32">
              <Button
                type="button"
                onClick={() => {
                  setUrl(`/product/${item?.id}`); setProducts([])
                }}
                className="border-brand-primary text-brand-primary border text-xs font-semibold hover:bg-[#FFE3D4] md:text-sm"
                variant="outline"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
