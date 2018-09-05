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
    else if (key < this.key ){ //switch this to test #2
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
// console.log(tree1);
const tree2 = new BinarySearchTree();
tree2.insert(8);
tree2.insert(3);
tree2.insert(10);
tree2.insert(6);
tree2.insert(1);
tree2.insert(14);
tree2.insert(4);
tree2.insert(13);
tree2.insert(7);

// console.log(tree2);


function findHeight(tree){

  if(!tree){
    return 0;
  }
  let leftHeight = findHeight(tree.left);
  // console.log(leftHeight);
  let rightHeight = findHeight(tree.right);
  // console.log(rightHeight);
  return (Math.max(leftHeight, rightHeight) + 1);
}



// console.log(findHeight(tree2));
// console.log('Divider');
// console.log(findHeight(tree2));

/*
------------------is it BST?---------------------
Write an algorithm to check whether an arbitrary binary tree is a binary search tree, 
assuming the tree does not contain duplicates.
*/

const isBst = (tree) => {
  // console.log(tree.left);
  if (!tree) {
    return true;
  }
  if (tree.left.key > tree.key) {
    return false;
  }
  if (tree.right.key < tree.key) {
    return false;
  }

  // if (isBst(tree.left) === null || isBst(tree.right) === null) {
  //   return false;
  // }
  return true;
};

// console.log(isBst(tree1));

/*

------------------Third largest node-----------------------

Write an algorithm to find the third largest node in a binary search tree

*/

// const findMax = (tree) =>  {
//   if (tree === null) {
//     return null;
//   } else if (!tree.right) {
//     return tree;
//   }
//   return findMax(tree.right);
// };
// console.log(findMax(tree2));

const nthLargest = (tree, state) => {
  if (tree.right) {
    nthLargest(tree.right, state);
  }
  if (!--state.n) { 
    state.result = tree.key;
    return;
  }
  if (tree.left) {
    nthLargest(tree.left, state);
  } 
}; 

const thirdLargest = (tree) => {
  if (!tree.key) {
    return null;
  }
  let state = {n: 3, result: null};
  nthLargest(tree, state);
  return state.result;
};

// console.log(thirdLargest(tree1));

// const thirdLargest = (tree) => {
//   let largest = findMax(tree);
//   let secondLargest = largest.parent;

//   if (secondLargest.left > secondLargest.parent) {
//     return secondLargest.left.key;
//   } else {
//     return secondLargest.key;
//   }
// };

// console.log(thirdLargest(tree2));

/*
-------------------Balanced BST--------------
Write an algorithm that checks if a BST is balanced (
  i.e. a tree where no two leaves differ in distance from the root 
  by more than one)
*/

const balanced = (tree) => {

  if(!tree){
    return 0;
  }
  let leftHeight = findHeight(tree.left);
  let rightHeight = findHeight(tree.right);

  if (Math.abs(leftHeight - rightHeight) > 1) {
    return false;
  }
  return true;

};

console.log(balanced(tree1));
>>>>>>> a59dcc721712d85a88da06d44bfcc7d564a2f977
