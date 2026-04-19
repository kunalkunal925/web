// ==========================================
// 1. STACK (LIFO) - For Recent Announcements
// ==========================================
export class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.items.length === 0) return "Underflow";
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  toArray() {
    // Return a reversed array so the newest item is at the top when rendering
    return [...this.items].reverse();
  }
}

// ==========================================
// 2. QUEUE (FIFO) - For Pending Assignments
// ==========================================
export class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length === 0;
  }
  toArray() {
    return [...this.items];
  }
}

// ==========================================
// 3. LINKED LIST - For Academic History
// ==========================================
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
  }
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}

// ==========================================
// 4. HASH MAP - For Quick Course/Student Lookup
// ==========================================
export class HashMap {
  constructor() {
    this.map = new Map(); // Using JS Map for O(1) complexity
  }
  set(key, value) {
    this.map.set(key, value);
  }
  get(key) {
    return this.map.get(key) || null;
  }
  has(key) {
    return this.map.has(key);
  }
}
