'use client'
import { isLoggedInVar } from "./admin-auth-guard"
import { makeClient } from "@/lib/graphql/ApolloWrapper"
import secureLocalStorage from "react-secure-storage"
import { deleteCookie } from "cookies-next"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"


function LogoutBtn({open}: {open: boolean}) {
  const client = makeClient()
  const logout = () => {
    localStorage.removeItem('jwt')

    // evict and garbage collect the cached user object
    client.resetStore()

    // Remove user details from localStorage
    localStorage.removeItem("jwt")
    deleteCookie('jwt')
    secureLocalStorage.removeItem("merchantId")

    isLoggedInVar(false)

  }
  return (
    <Button variant={"outline"} size={"sm"} className="font-bold" onClick={logout}>
      {open ? "logout" : <LogOutIcon />}
    </Button>
  )
}

export default LogoutBtn