
import CategoryList from "@/app/components/pc/CategoryList";
import ClientPage from "@/app/blog/clientPage"

export default function Home() {
  const d = Math.random()
  const fn = () => {
    // nRouter.push("/aaa")
  }
  return (
    <div>
      <ClientPage>
        <CategoryList />
      </ClientPage>

    </div>
  );
}
