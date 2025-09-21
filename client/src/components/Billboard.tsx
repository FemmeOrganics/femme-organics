"use client"
import {Container} from "@/components/ui/Container";
import type { GetBillboardsQuery } from "@/__gql__/graphql";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "./ui/button";
import { useRef } from "react";
import { StepBack, StepForward } from "lucide-react";

interface BillboardProps {
    billboards: GetBillboardsQuery["billboards"]
}
export const Billboard: React.FC<BillboardProps> = ({billboards}) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <Container className="h-fit relative px-0">
            <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 4000 }}
                  loop={true}
                  navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                  onBeforeInit={(swiper) => {
                    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                    }
                  }}
                  className="rounded-none md:rounded-2xl shadow-sm relative"
            >
                {billboards?.map((billboard) => 
                <SwiperSlide key={billboard?.id}>
                    <div 
                        key={billboard?.id}
                        style={{backgroundImage: `url(${billboard?.url})`}}
                        className="rounded-none md:rounded-2xl relative aspect-[2.4/1] md:aspect-[2.4/1] bg-cover h-full"
                    >
                        <div className="w-full flex flex-col items-center justify-center text-center gap-y-8 h-full">
                            <div className="text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs font-bold my-auto text-gray-800 bg-white/30 backdrop-blur-sm">
                                {billboard?.label}
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                    )}
            <Button
                ref={prevRef}
                variant={"ghost"}
                size={"icon"}
                className="absolute top-1/2 left-0 md:left-2 z-10 transform -translate-y-1/2 p-2 rounded-full shadow-md"
            >
                <StepBack />
            </Button>
            <Button
                ref={nextRef}
                variant={"ghost"}
                size={"icon"}
                className="absolute top-1/2 right-0 md:right-2 z-10 transform -translate-y-1/2 p-2 rounded-full shadow-md"
            >
                <StepForward />
            </Button>
            </Swiper>
           
        </Container>
  );
};

