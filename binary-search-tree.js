'use strict';

class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.right = null;
    this.left = null;
  }

  insert(key, value) {
    if(this.key === null){
      this.key = key;
      this.value = value;
    }
    else if (key < this.key ){
      if (this.left === null){
        this.left = new BinarySearchTree(key, value, this);
           
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    //if the item is found at the root then return that value
    if (this.key === key) {
      return this.value;
    }
    //if the item you are looking for is less than the root 
    //then follow the left child
    //if there is an existing left child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if the item you are looking for is greater than the root 
    //then follow the right child
    //if there is an existing right child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //You have search the treen and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }
  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

    const tree1 = new BinarySearchTree();
    tree1.insert(3);
    tree1.insert(1);
    tree1.insert(4);
    tree1.insert(6);
    tree1.insert(9);
    tree1.insert(5);
    tree1.insert(7);
    //console.log(tree1);
    //console.log((JSON.stringify(tree1, null, 2)));
const tree2 = new BinarySearchTree();
tree2.insert(3);
tree2.insert(1);
tree2.insert(4);
tree2.insert(6);
tree2.insert(9);
tree2.insert(5);
tree2.insert(7);
tree2.insert(10);
tree2.insert(12);




function findHeight(tree){
if(!tree){
    return 0;
}
let leftHeight = findHeight(tree.left);
console.log('left', leftHeight);
let rightHeght = findHeight(tree.right);
console.log('right', rightHeght);
return (Math.max(leftHeight, rightHeght) + 1);
}


//console.log(findHeight(tree2));
//console.log('Divider');
//console.log(findHeight(tree1));
findHeight(tree1);