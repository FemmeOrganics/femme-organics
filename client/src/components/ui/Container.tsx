import { cn } from "@/src/lib/utils";

interface ContainerProps {
    children: React.ReactNode
    className?: string;
}
export const Container: React.FC<ContainerProps> = ({children, className}) => {
  return (
    <div className={cn("mx-auto h-full max-w-full md:max-w-7xl px-2 md:px-2 lg:px-20 py-0 ", className)}>
      {children}
    </div>
  )
}

