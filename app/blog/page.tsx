// "use server"
import CategoryList from "@/app/components/pc/CategoryList";
import ClientPage from "@/app/blog/clientPage"
import ServerRenderCpt from "@/app/blog/serverRenderCpt/page"


export default async  function Home() {
  const d = Math.random()
  const fn = () => {
    // nRouter.push("/aaa")
  }
  return (
    <div>
      {/* <ServerRenderCpt></ServerRenderCpt> */}
      <ClientPage></ClientPage>

    </div>
  );
}
