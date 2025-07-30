
import Network from "@/network"
import CategoryListClient from "./CategoryListClient"

export default async () => {

 // let categoryInfoParams: ResData = {
 //  results: []
 // }
 // const res = await Network.get("", {
 //  params: {
 //   "tableName": "codeList",
 //  }
 // }) as {
 //  data: ResData
 // }
 // categoryInfoParams = res.data
 return (
  <>
   <CategoryListClient />
  </>
 )
}