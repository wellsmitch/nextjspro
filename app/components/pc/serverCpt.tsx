export default  async ()=> {
   const res = await fetch("https://server.wellsmitch.top/api/getcodeList",{
   method: "get"
  })
  const data = res.json()
  
  return <>---{data}</>
}