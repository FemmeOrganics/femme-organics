'use client'
import {AppSideBar} from './app-sidebar'
import StoreSwitcher from './StoreSwitcher'
import { TipTool } from '@/components/ui/TipTool'
import { useSuspenseQuery } from '@apollo/client'
import { GetAllStoresDocument } from '@/graphql'
import { StoreIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
const Navbar = () => {
  const { data } = useSuspenseQuery(GetAllStoresDocument)
  const stores = data?.stores

  return (
      <div className="flex flex-col items-center py-2 px-1 space-y-2 bg-muted/30">
        <DropdownMenu>
            <TipTool tip='Stores menu' sideOffset={4}>
                <DropdownMenuTrigger asChild className='z-50'>
                    <StoreIcon size={"25"} className=" hover:text-primary  dark:text-slate-400 text-slate-500"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='z-50'>
                    <StoreSwitcher items={stores} />
                </DropdownMenuContent>
            </TipTool>
        </DropdownMenu>
        <AppSideBar/> 
    </div>
  )
}

export default Navbar