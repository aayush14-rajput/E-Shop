export const Truncate=(str:string)=>{
    if(str.length<23) return str;
    return str.substring(0,23)+"..."

}