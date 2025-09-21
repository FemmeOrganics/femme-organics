import { Container } from "@/src/components/ui/Container";
import { Skeleton } from "@/src/components/ui/skeleton";
import { cn } from "@/src/lib/utils";

export function SkeletonCard({orientation}: {orientation: "horizontal" | "viertical"}) {
    return (
      <div className="h-full w-full py-2 flex flex-col space-y-2 text-gray-800 min-h-screen">
        <Container className="space-y-4">
            <Skeleton className="w-full h-[30dvh] md:h-[50dvh] rounded-xl bg-slate-200 " />
    
            <Skeleton className="w-full rounded-xl h-[120px] bg-slate-200 " />
      
            <div
                className={cn(
                "w-fit mx-auto",
                orientation === "horizontal"
                    ? "flex flex-row space-x-2"
                    : "grid grid-cols-3 gap-4 justify-items-start max-w-6xl mx-auto",
                )}
            >
                {Array.from({length: 4}).map((item, index) => 
                    <Skeleton key={index} className="max-h-[240px] min-h-[240px] bg-slate-200 min-w-[145px] max-w-[175px]  md:min-w-[180px]  md:h-[350px] md:w-[220px" />
                )}
            </div>
        </Container>


        
      </div>
    )
  }