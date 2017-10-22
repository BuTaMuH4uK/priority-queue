const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.sizeHeap = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.sizeHeap++;
	}

	pop() {
		if(!this.root) {return;}
		let detached = this.detachRoot();
		if(this.size()) {
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
		}
		return detached.data;
	}

	detachRoot() {
		if(!this.root.right) {
			this.parentNodes.shift();
		}
		this.sizeHeap--;
		let root = this.root;
		this.root = null;
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastNode = this.parentNodes[this.parentNodes.length - 1];
		if(lastNode.parent && lastNode.parent.right) {this.parentNodes.unshift(lastNode.parent);}
		lastNode.remove();
		this.parentNodes.pop();
		if(detached.left) {
			lastNode.left = detached.left;
			lastNode.left.parent = lastNode;
		}
		if(detached.right) {
			lastNode.right = detached.right;
			lastNode.right.parent = lastNode;
		}
		this.root = lastNode;
		if(this.parentNodes.indexOf(detached) + 1) {
			this.parentNodes[this.parentNodes.indexOf(detached)] = lastNode;
		}
	}

	size() {
		return this.sizeHeap;
	}

	isEmpty() {
		return !(Boolean(this.root) || this.parentNodes.length != 0);
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.sizeHeap = 0;
	}

	insertNode(node) {
		if(!this.root) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}
		this.parentNodes[0].appendChild(node);
		if(this.parentNodes[0].right) {this.parentNodes.shift();}
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if(!node.parent) {this.root = node;	return;}
		if(node.priority <= node.parent.priority) {return;}
		if(!node.right) {
			let parent = node.parent;
			node.swapWithParent();
			this.parentNodes[this.parentNodes.indexOf(parent)] = node;
			this.parentNodes[this.parentNodes.lastIndexOf(node)] = parent;
		} else {node.swapWithParent();}
		return this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
		if(node.right) {
			let maxSon = node.right.priority > node.left.priority ? node.right : node.left;
			if(maxSon.priority > node.priority) {
				if(this.root == node) {
					this.root = maxSon;
				}
				maxSon.swapWithParent();
				if(!node.right) {
					this.parentNodes[this.parentNodes.indexOf(node)] = node.parent;
					this.parentNodes[this.parentNodes.lastIndexOf(node.parent)] = node;
				}
				return this.shiftNodeDown(node);
			}
		} else if(node.left && node.left.priority > node.priority) {
			if(this.root == node) {
				this.root = node.left;
			}
			node.left.swapWithParent();
			if(!node.right) {
				this.parentNodes[this.parentNodes.indexOf(node)] = node.parent;
				this.parentNodes[this.parentNodes.lastIndexOf(node.parent)] = node;
			}
			return this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
