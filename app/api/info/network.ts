import axios from 'axios'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"
import CryptoJS from 'crypto-js'
import { config } from 'process';

const service = axios.create({
 timeout: 60000, // 设置超时时间 
})


const restfulAPI = function (url: string, formData: any): any {
 const newFormData = Array.isArray(formData)
  ? [...formData]
  : { ...formData };
 if (!url) throw new Error("url不能为空！");
 if (url.indexOf("{") === -1 || !formData)
  return { restUrl: url, data: newFormData };
 let restfulArray = url.split("/");
 const result = restfulArray.map((item) => {
  if (item.indexOf("{") !== -1) {
   const key = item.substring(1, item.length - 1);
   let temp = newFormData[key] || ""
   delete newFormData[key];
   return temp;
  }
  return item;
 });
 return { restUrl: result.join("/"), data: newFormData };
};

const appId = "A9aaTVA1J2L2uEp8DQH6btzA-gzGzoHsz";
const appKey = "0rYyOPruxUZkcaU8EXoCr60W"
const marsterKey = "RfAfAetdO2vUko1qoExUFqWw"
const dd = Date.now();

service.interceptors.request.use((request: InternalAxiosRequestConfig) => {
 const options = request
 const md5Fn = (str: any) => CryptoJS.MD5(str)
 const baseUrl = `https:/a9aatva1.lc-cn-n1-shared.com/1.1/classes/{tableName}`
 let { restUrl, data } = restfulAPI(baseUrl + (options?.url ? "/" + options?.url : ""), options?.params);
 delete options.params
 delete options?.headers?.autoWell;
 if (restUrl.indexOf("qqapi") > -1) {
  restUrl = options?.url
 }

console.log("restUrl>>>>>>>")
 request.url = restUrl
 request.headers['X-LC-Id'] = appId
 request.headers["X-LC-Sign"] = !options?.headers?.autoWell ? `${md5Fn(dd + appKey)},${dd}` : `${md5Fn(dd + marsterKey)},${dd},master`
 request.params = data
 return request;
}
);

export default service