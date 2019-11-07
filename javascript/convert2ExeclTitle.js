/**
 * @param {number} n
 * @return {string}
 */
var convertToTitle = function(n) {
    const map = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y']
    let count = n
    let ans = ""
    while (count) {
        ans = map[count % 26] + ans
        count = count % 26 === 0 ? Math.floor(count / 26) - 1 : Math.floor(count / 26)
    }
    return ans
};

作者：zjutszl
链接：https://leetcode-cn.com/problems/excel-sheet-column-title/solution/javascript-shao-you-bu-tong-de-26jin-zhi-by-zjutsz/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
