type Validates={
    key:string,
    fn:Function
    info:string,
    arguments?:any[]
}
import { useMessage } from '../stores';
export function isNotEmpty(str:string){
return !!str.length
}
export function isEqual(str1:string,str2:string){
    return str1==str2
    }
const messageController=useMessage();
export  function check(obj:{[key:string]:any},validates:Validates[]){
 for(let key in obj){
    const validate=validates.find(v=>v.key==key);
    if(validate){
            //存在其他参数
        if(validate.arguments){
            if(validate.fn(obj[validate.key],...validate.arguments)){
                continue
            }else{
                messageController.$patch({level:"tips",info:validate.info});
                return false 
            }
        }
        //不存在其他函数
        if(validate.fn(obj[validate.key])){
            continue
        }else{
            messageController.$patch({level:"tips",info:validate.info});
            return false 
        }
    }
 }
 return true
}
// 3167385363@qq.com