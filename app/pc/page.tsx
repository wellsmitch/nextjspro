
import CategoryList from "@/app/components/pc/CategoryList";

export default function Home() {
  const d = Math.random()
  return (
    <div>
     pc index-{d}
     <CategoryList/>
    </div>
  );
}
