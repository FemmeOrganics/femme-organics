"use client"
import type React from "react";
import { Container } from "./ui/Container";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export const Section = ({
  title,
  categoryId,
  children,
}: { title: string; categoryId?: number | null; children: React.ReactNode }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [url, setUrl] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    if (url && linkRef.current) {
      linkRef.current.click();
    }
  }, [url]);
  
  return (
    <Container className="relative mx-auto h-fit space-y-2 w-full">
       <Link href={url ?? ""} ref={linkRef} />
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4 text-black">{title}</h2>
       { categoryId && <Button onClick={() => setUrl(`/category/${categoryId}`)} type="button" variant={"link"} className='text-blue-400 p-0 h-fit'>View All</Button>}
      </div>
      <div>{children}</div>
    </Container>
  );
};
