// ==========================================
// 01. Isomorphic Strings
// ==========================================
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    if (s.length !== t.length) return false;
    const mapS = new Map();
    const mapT = new Map();
    
    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];
        
        if ((mapS.has(charS) && mapS.get(charS) !== charT) ||
            (mapT.has(charT) && mapT.get(charT) !== charS)) {
            return false;
        }
        
        mapS.set(charS, charT);
        mapT.set(charT, charS);
    }
    return true;
};


// 02. Word Pattern

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    const words = s.split(' ');
    if (pattern.length !== words.length) return false;
    
    const charToWord = new Map();
    const wordToChar = new Map();
    
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];
        
        if ((charToWord.has(char) && charToWord.get(char) !== word) ||
            (wordToChar.has(word) && wordToChar.get(word) !== char)) {
            return false;
        }
        
        charToWord.set(char, word);
        wordToChar.set(word, char);
    }
    return true;
};


// 03. Find the Difference

/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    let charCode = 0;
    for (let i = 0; i < s.length; i++) {
        charCode ^= s.charCodeAt(i);
    }
    for (let i = 0; i < t.length; i++) {
        charCode ^= t.charCodeAt(i);
    }
    return String.fromCharCode(charCode);
};



// 04. Reverse Linked List

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    
    while (curr !== null) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
};

// Helper for Linked List Testing
function createList(arr) {
    let dummy = { val: 0, next: null };
    let curr = dummy;
    for (let val of arr) {
        curr.next = { val: val, next: null };
        curr = curr.next;
    }
    return dummy.next;
}
function printList(head) {
    let res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}


// 05. Middle of the Linked List

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let slow = head;
    let fast = head;
    
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
};



// 06. Product of Array Except Self

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length;
    const res = new Array(n).fill(1);
    
    let left = 1;
    for (let i = 0; i < n; i++) {
        res[i] = left;
        left *= nums[i];
    }
    
    let right = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    
    return res;
};



// 07. Remove Nth Node From End of List

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let dummy = { val: 0, next: head };
    let fast = dummy;
    let slow = dummy;
    
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }
    
    slow.next = slow.next.next;
    return dummy.next;
};



// 08. Find First and Last Position of Element in Sorted Array

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    const findBound = (isFirst) => {
        let left = 0, right = nums.length - 1;
        let bound = -1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                bound = mid;
                if (isFirst) right = mid - 1;
                else left = mid + 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return bound;
    };
    
    return [findBound(true), findBound(false)];
};



// 09. Permutation in String

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;
    
    const count1 = new Array(26).fill(0);
    const count2 = new Array(26).fill(0);
    const aCode = 'a'.charCodeAt(0);
    
    for (let i = 0; i < s1.length; i++) {
        count1[s1.charCodeAt(i) - aCode]++;
        count2[s2.charCodeAt(i) - aCode]++;
    }
    
    let matches = 0;
    for (let i = 0; i < 26; i++) {
        if (count1[i] === count2[i]) matches++;
    }
    
    for (let i = 0; i < s2.length - s1.length; i++) {
        if (matches === 26) return true;
        
        let l = s2.charCodeAt(i) - aCode;
        let r = s2.charCodeAt(i + s1.length) - aCode;
        
        count2[r]++;
        if (count1[r] === count2[r]) matches++;
        else if (count1[r] + 1 === count2[r]) matches--;
        
        count2[l]--;
        if (count1[l] === count2[l]) matches++;
        else if (count1[l] - 1 === count2[l]) matches--;
    }
    
    return matches === 26;
};


// 10. Find All Anagrams in a String

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const res = [];
    if (s.length < p.length) return res;
    
    const pCount = new Array(26).fill(0);
    const sCount = new Array(26).fill(0);
    const aCode = 'a'.charCodeAt(0);
    
    for (let i = 0; i < p.length; i++) {
        pCount[p.charCodeAt(i) - aCode]++;
        sCount[s.charCodeAt(i) - aCode]++;
    }
    
    const isSame = () => pCount.every((val, idx) => val === sCount[idx]);
    
    if (isSame()) res.push(0);
    
    for (let i = 0; i < s.length - p.length; i++) {
        sCount[s.charCodeAt(i) - aCode]--;
        sCount[s.charCodeAt(i + p.length) - aCode]++;
        if (isSame()) res.push(i + 1);
    }
    
    return res;
};

