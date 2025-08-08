

export default async ()=> {
   const res = await fetch("https://server.wellsmitch.top/api/getcodeList",{
   method: "get"
  })
  console.log('uuuuuuuuuuuuuuuu')
  await new Promise((d:any)=> {
   setTimeout(()=> {
    d()
   }, 10000)
  })
  const data = res.json()
  
  return <h2>---{JSON.stringify(data)}</h2>
}