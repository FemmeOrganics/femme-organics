"use client";
import { GetCustomerDocument, LoginCustomerDocument, SignupCustomerDocument, UserRole, } from "@/__gql__/graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import {getCookie, setCookie} from 'cookies-next'
import { redirect, usePathname, useSearchParams } from "next/navigation";
import {jwtDecode} from "jwt-decode"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGlobalStore, UserType } from "../app/(customer)/store";

interface AuthState {
  user?: UserType
  loading?: boolean;
  isTransitioning?: boolean;
  error?: Error;
  loginCredentials?: { phoneNumber: string };
  sessionType?: "login" | "signup" | "confirm";
  nextStep?: "COMPLETE_AUTO_SIGN_IN" | "DONE";
  redirectUrl?: string;
}

interface AuthAction {
  signIn: (data: {phoneNumber: string, password: string}) => Promise<void>;
  signUp: (data: {phoneNumber: string, password: string, name: string}) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<(AuthState & AuthAction) | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  publicRoutes: (string | RegExp)[];
  authLinks?: {
    signIn: string;
    signUp: string;
  };
  home: string,
}

export const CustomerAuthProvider = ({
  children,
  publicRoutes,
  home = "/",
  authLinks = {
    signIn: "/auth",
    signUp: "/auth",
  },
}: AuthProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [auth, setAuth] = useState<AuthState>();
  const [loginCustomer, { data, loading, error }] = useMutation(LoginCustomerDocument)
  const [signUpCustomer] = useMutation(SignupCustomerDocument)
  const [setUser] = useGlobalStore(state => [state.setUser])
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const linkRef = useRef<HTMLAnchorElement>(null);
  const [url, setUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadUser = async () => {
      const token = getCookie("jwt");
      if (token) {
        const data = jwtDecode(token as string) as { 
          phoneNumber: string, 
          role: string, 
          id: number, 
          customerId: number, 
          name: string 
        };

        setUser({
          id: data.id,
          phoneNumber: data.phoneNumber,
          role: data.role,
          name: data.name,
          customerId: data.customerId
        })
  
        if (data?.id) {
          setAuth((prev) => ({
            ...prev,
            user: {
              id: data.id,
              phoneNumber: data.phoneNumber,
              role: data.role,
              name: data.name,
              customerId: data.customerId
            } as UserType
          }));
        }
      } else {
        setAuth((prev) => ({
          ...prev,
          user: undefined
        }));
      }
    };
  
    // Initial load
    loadUser();
  
    // Listen for localStorage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "jwt") {
        loadUser();
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    // Polling for cookie changes (since there's no cookie event listener)
    let prevToken = getCookie("jwt");
    const checkCookieChange = setInterval(() => {
      const currentToken = getCookie("jwt");
      if (currentToken !== prevToken) {
        prevToken = currentToken;
        loadUser();
      }
    }, 1000); // Check every second
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(checkCookieChange);
    };
  }, []);
  

  const isPublicRoute = publicRoutes.some((route) => {
    if (typeof route === "string") {
      return pathname === route;
    }

    return route.test(pathname);
  });

  const redirectTo = async (defaultUrl: string) => {
    try {
      const user = auth?.user 
      let url = "/";
      if (user?.name && defaultUrl) {
        url = defaultUrl;
      } 
      return url;
    } catch (err) {
      console.log(err)
    }
  };

  const isAuthPage = Object.values(authLinks).some((link) =>
    pathname.startsWith(link),
  );

   // authed user trying to access auth pages
   if (auth?.user && isAuthPage) {
    const next = searchParams.get("next");
    redirectTo(next ?? home ?? "/").then((to) => {
      setUrl(to ?? next ?? home ?? "/");
    });
  }

  if (!auth?.user && !isPublicRoute && !isAuthPage) {
    redirect(`${authLinks.signIn}?next=${pathname ?? "/"}`);
  }

  const signUp = async (data: {phoneNumber: string, password: string, name: string}) => {
    const next = searchParams.get("next");
    await signUpCustomer({
      //@ts-ignore
      update(cache, { data: { signupCustomer } }) {
          if (signupCustomer.auth.token) {
              setCookie('jwt', signupCustomer.auth.token, {maxAge:  60 * 60 * 24})
              localStorage.setItem('jwt', signupCustomer.auth.token);
          }
          // setUrl(next ?? "/")
      },
      variables: { 
          user: {
              phoneNumber: data.phoneNumber,
              password: data.password,
              role: UserRole.Customer
          },
          customer: {
            name: data.name,
          }
      }
  })
  };

  const signIn = async (data: {phoneNumber: string, password: string}) => {
    const next = searchParams.get("next");

    await loginCustomer({
      //@ts-ignore
      update(cache, { data: { loginCustomer } }) {
        if (loginCustomer.auth.token) {
            setCookie('jwt', loginCustomer.auth.token, {maxAge:  60 * 60 * 24})
            localStorage.setItem('jwt', loginCustomer.auth.token);
        }
        // setUrl(next ?? "/")
      },
      variables: { 
          user: {
              phoneNumber: data.phoneNumber,
              password: data.password,
              role: UserRole.Customer
          }
      }
  })
  };

  const signOut = async () => {
    setCookie('jwt', "")
    localStorage.setItem('jwt', "");
    setAuth((prev) => (
      {...prev, user: undefined}
    ))
    setUrl(`/`);
  };


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (url && linkRef.current) {
      linkRef.current.click();
    }
  }, [url]);

  if (!isMounted) {
    return;
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        signIn,
        signOut,
        signUp,
      }}
    >
      <Link href={url ?? ""} ref={linkRef} replace />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};