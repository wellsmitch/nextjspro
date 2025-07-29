import { GetServerSideProps } from "next";

export const getServerSideProps :GetServerSideProps = async()=> {
  const ccc = await new Promise(d=> {
          setTimeout(()=> {
            d([123666666])
          },1000)
        })
    return {
        props: {
          ccc
        }
    };
}
export default function Dashboard({ccc}:any) {
  
  return (
    <h1>ss
     {JSON.stringify(ccc)}
    </h1>
  )
}