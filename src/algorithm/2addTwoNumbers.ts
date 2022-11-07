/* eslint-disable @typescript-eslint/explicit-member-accessibility */
// 2. 两数相加
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const temp1 = new ListNode(9);
temp1.next = new ListNode(9);
temp1.next.next = new ListNode(9);
temp1.next.next.next = new ListNode(9);
temp1.next.next.next.next = new ListNode(9);
temp1.next.next.next.next.next = new ListNode(9);
temp1.next.next.next.next.next.next = new ListNode(9);

const temp2 = new ListNode(9);
temp2.next = new ListNode(9);
temp2.next.next = new ListNode(9);
temp2.next.next.next = new ListNode(9);

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let start = null;
    let temp = null;
  let temp1 = l1;
    let temp2 = l2;
  let carry = false;
  while (temp1 || temp2) {
    console.log(temp1, temp2);
    const v1 = temp1?.val ?? 0;
    const v2 = temp2?.val ?? 0;
    const sum = (v1 + v2 + Number(carry)) % 10;
    if (!start) {
      start = temp = new ListNode(sum);
    } else {
      temp.next = new ListNode(sum);
      // @ts-ignore
      temp = temp.next;
    }

    if (v1 + v2 + Number(carry) >= 10) carry = true;
    else carry = false;

    if (temp1) temp1 = temp1.next;
    if (temp2) temp2 = temp2.next;
  }
  if (carry) temp.next = new ListNode(Number(carry));
  return start;
}

const linkStart = addTwoNumbers(temp1, temp2);
console.log(linkStart);
