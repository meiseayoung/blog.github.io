/**
 * 匹配的选项排序置顶
 * @param {*} array 
 * @param {*} values 
 * @param {*} key 
 */
export default function sortList(array,values,key){
    let selectedArray = array.filter(item=>values.includes( key ? item[key] : item));
    let notSelectedArray = array.filter(item=>!values.includes(key ? item[key] : item));
    return [...selectedArray,...notSelectedArray];
}
