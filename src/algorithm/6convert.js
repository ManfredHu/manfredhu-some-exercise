"use strict";
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
// https://leetcode-cn.com/problems/zigzag-conversion/
// 6. Z 字形变换
// 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
// 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
// P   A   H   N
// A P L S I I G
// Y   I   R
// 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
// 请你实现这个将字符串进行指定行数变换的函数：
// string convert(string s, int numRows);
//  
// 示例 1：
// 输入：s = "PAYPALISHIRING", numRows = 3
// 输出："PAHNAPLSIIGYIR"
// 示例 2：
// 输入：s = "PAYPALISHIRING", numRows = 4
// 输出："PINALSIGYAHRPI"
// 解释：
// P     I    N
// A   L S  I G
// Y A   H R
// P     I
// 示例 3：
// 输入：s = "A", numRows = 1
// 输出："A"
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/zigzag-conversion
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
// 找出数组下标于numRows的关系
// 0。   2n-2.  4n-4 
// ｜.    |.     |
// ｜.    |.     |
// n-1.  3n-3.  5n-5
function convert(s, numRows) {
    // console.log(`s`, s)
    // console.log(`numRows`, numRows)
    if (s.length <= numRows || numRows <= 1)
        return s;
    let row = 0; // 0-n
    let isGoingDown = false;
    const rst = new Array(numRows).fill(null).map(_ => []); // 空的二维数组
    for (let i = 0; i < s.length; i++) {
        // console.log(`i`, i, s.charAt(i), row)
        // @ts-ignore
        rst[row].push(s.charAt(i));
        // console.log(`rst`, JSON.stringify(rst))
        if (row === 0 || row === numRows - 1) { // 最低或者最高反转一下
            isGoingDown = !isGoingDown;
        }
        isGoingDown ? row++ : row--;
    }
    return rst.reduce((acc, cur) => acc + cur.join(''), '');
}
;
const result = convert("zpaqojvamrjkdfwfsfjoblbhtjcpdbjdqkvevshhjssnzosstdgwqhelqibumkzcwujsnsbyktlkkgeflkectkpjuqfgdgjbduvqmxqysckekomvaqxtanfufmbktmmwijouieubifhsvtowjlrjawgijjuexiafsqbauvddclvaejyoxrzzohjzqefpmhugxxhtvmwzxuzcfzsertghbpittnjiudorbxmwkjvjfxnmwfrpzxwametiresniiglgtjsegdjfrvcyotxlqzawviqzcdjkkwsffkjoquthpxfgrfrjetfbdvdfbmqnlisqvbglvaumxbsqgmznffojcrqdggqrrijmlqzgstvpupidbhqjmgupakuitlzktkwhcxpuqkmmcupfbhoqokfovzwomxyijwpmteglrsztmpyowpemzlcumakzxkjhgyvbcbovuooifpybeeqdrsaetkfsvobdmwhqyvoujceotdsxhkbbcdfxnmqkatooqxgqswkebosutmsdwvebylynxqyzkonalvqfscjtqenmqhppetqceqsbhqcrgrttmjygnibdorreygvfblhfcbiltmczdvuqgtytdayrrqxrytwagghkhsvdezeiuzacuyvxawqrmplmkjmrpwbzqzcuygevhexbfvafrqzfikrstgjlenkuooqmwvhebhhgciovanaiztbszmffbrzpfscenlkqsrzwznrcctkbnnvoaduduvtanxgckqtfhsbjhvllovobllqlomqjhjlvgrxthsyqmzztukgliumtgeguqwdygovofuhonffzhevdrbozwdschawawcyeqvvypeocmtctaxyrapswsmybmxbkzbrrwmrmqgqcbuxdtwuuloqfargoqkzrlqiiecwukozljwpeulyharmc", 623);
console.log(`result`, result);
