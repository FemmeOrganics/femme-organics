'use client'
import { gql, makeVar, useQuery } from '@apollo/client';
import { Admin } from './admin-auth'
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { usePathname } from 'next/navigation';

interface GuardProps {
  children: React.ReactNode
}
export const isLoggedInVar = makeVar<boolean>(false)
export const merchantId = makeVar<number>(-100)


const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function AdminAuthGuard({ children }: GuardProps) {
  const pathnames = usePathname().split("/")
  const [isMounted, setIsMounted] = useState(false)
  const {data} = useQuery(IS_LOGGED_IN)
  isLoggedInVar(!!getCookie('jwt'))
  merchantId(Number.parseInt(secureLocalStorage.getItem('merchantId') as string))

  useEffect(() => {
    setIsMounted(true)
  },[])
  if(!isMounted) return null
  if(pathnames.includes("admin") && !data.isLoggedIn) {return <Admin/>}
  return<div className='w-full h-full'>{children}</div> 
}

export default AdminAuthGuard