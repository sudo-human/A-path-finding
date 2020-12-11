"use strict";
class Heap {
  constructor(isLess, arr = []) {
    this.arr = arr;
    this.isLess = isLess;
    this.size = this.arr.lenght ?? 0;
  }
  peek() {
    return this.arr[0];
  }
  poll() {
    const least = this.arr[0];
    [this.arr[0], this.arr[this.size - 1]] = [
      this.arr[this.size - 1],
      this.arr[0],
    ];
    this.arr.pop();
    this.size--;
    this.heapifyDown();
    return least;
  }
  insert(el) {
    this.arr.push(el);
    this.size++;
    this.heapifyUp();
  }
  hasParent(index) {
    if (index <= 0) return false;
    else return true;
  }
  hasLeftChild(index) {
    if (2 * index + 1 < this.size) return true;
    else return false;
  }
  hasRightChild(index) {
    if (2 * index + 2 < this.size) return true;
    else return false;
  }
  heapifyUp() {
    let current = this.size - 1;
    let parent = Math.floor((current - 1) / 2);
    while (
      this.hasParent(current) &&
      !this.isLess(this.arr[parent], this.arr[current])
    ) {
      [this.arr[parent], this.arr[current]] = [
        this.arr[current],
        this.arr[parent],
      ];
      current = parent;
      parent = Math.floor((current - 1) / 2);
    }
  }
  heapifyDown() {
    let current = 0;
    let child = [2 * current + 1, 2 * current + 2];
    while (this.hasLeftChild(current)) {
      let smallerChild = child[0];
      if (
        this.hasRightChild(current) &&
        this.isLess(this.arr[child[1]], this.arr[child[0]])
      )
        smallerChild = child[1];
      if (this.arr[current] < this.arr[smallerChild]) break;
      else
        [this.arr[current], this.arr[smallerChild]] = [
          this.arr[smallerChild],
          this.arr[current],
        ];
      current = smallerChild;
      child = [2 * current + 1, 2 * current + 2];
    }
  }
  has(el) {
    return this.arr.includes(el);
  }
}
