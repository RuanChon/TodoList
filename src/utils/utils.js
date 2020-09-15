

// 验证字符串
export function isNull(str){
    if ( str == "" || str == null ){
        return true;
    }
        
    let regu = "^[ ]+$";
    let re = new RegExp(regu);
    return re.test(str);
}