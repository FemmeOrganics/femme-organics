import { cn } from "@/lib/utils";
import { AccordionTrigger } from "@/components/ui/accordion";

export const CustomTrigger = ({
  children,
  onClick,
  index,
  className,
  showTrigger = true,
}: {
  children: React.ReactNode;
  onClick: (index: string) => void;
  className?: string;
  index?: string;
  showTrigger?: boolean;
}) => {
  return (
    <>
      {showTrigger ? (
        <AccordionTrigger
          onClick={() => onClick(index as unknown as string)}
          className={cn("py-0",className)}
        >
          {children}
        </AccordionTrigger>
      ) : (
        <div className="item-center flex">
          <div className="flex-1">{children}</div>{" "}
          <span className="w-[15px]"/>{" "}
        </div>
      )}
    </>
  );
};
