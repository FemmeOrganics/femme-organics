import { GetStoreDocument } from "@/graphql";
import { redirect } from "next/navigation";
import { getClient } from "@/lib/graphql/ApolloClient";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSideBar } from "./components/app-sidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  // check if user is logged in if not redirect to login page

  let store = null;
  try {
    const { data } = await getClient().query({
      query: GetStoreDocument,
      variables: { storeId: Number.parseInt(params.storeId) },
    });
    store = data?.store;
  } catch (error) {}

  // if no storeId was provided redirect to the root
  if (!store) {
    redirect("/admin");
  }

  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="w-full">

        <SidebarTrigger className="block md:hidden" />
        {children}
      </main>
    </SidebarProvider>
  );
}
