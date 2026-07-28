
import crypto from "crypto"
import path from "path";
import fs from "fs"

const buildRandom = () => Math.random()
export const writeFile = ()=> {
// 1. 写入文件到 /tmp
const is = fs.existsSync("/tmp")
if(!is) {
    fs.mkdirSync('/tmp');
}

const tempFilePath = path.join('/tmp', 'my-data.txt');
console.log(tempFilePath)
fs.writeFileSync(tempFilePath, 'adddaaaHello, Vercel!'+Math.random());
   const jsonString = fs.readFileSync(tempFilePath, 'utf-8');
    // const data = JSON.parse(jsonString);
    console.log(jsonString);
}

class WXBizDataCrypt {
    appId="";
    sessionKey=""
    constructor(appId: string, sessionKey: string) {
        this.appId = appId
        this.sessionKey = sessionKey
    }
    decryptData(encryptedData: any, iv: any) {
        // base64 decode
        var sessionKey = new Buffer(this.sessionKey, 'base64')
        encryptedData = new Buffer(encryptedData, 'base64')
        iv = new Buffer(iv, 'base64')

        try {
            debugger
            // 解密
            var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true)
            var decoded = decipher.update(encryptedData, 'binary', 'utf8')
            decoded += decipher.final('utf8')

            decoded = JSON.parse(decoded)

        } catch (err) {
            throw new Error('Illegal Buffer')
        }

        return decoded
    }
}

export {
    buildRandom,
    WXBizDataCrypt
}
