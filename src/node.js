class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(!this.left) {
			this.left = node;
			this.left.parent = this;
		} else if(!this.right) {
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		switch(node) {
			case this.left : this.left.parent = null; this.left = null; break;
			case this.right : this.right.parent = null; this.right = null; break;
			default : throw Error;
		}
	}

	remove() {
		if(this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if(this.parent) {
			var temp;
			if(this.parent.left == this) {
				this.parent.left = this.left;
				if(this.parent.left) {this.parent.left.parent = this.parent;}
				temp = this.parent.right;
				this.parent.right = this.right;
				if(this.parent.right) {this.parent.right.parent = this.parent;}
				this.right = temp;
				if(this.right) {this.right.parent = this};
				this.left = this.parent;
			} else {
				this.parent.right = this.right;
				if(this.parent.right) {this.parent.right.parent = this.parent;}
				temp = this.parent.left;
				this.parent.left = this.left;
				if(this.parent.left) {this.parent.left.parent = this.parent;}
				this.left = temp;
				if(this.left) {this.left.parent = this};
				this.right = this.parent;
			}
			if(this.parent.parent) {this.parent.parent.left == this.parent ? this.parent.parent.left = this : this.parent.parent.right = this;} 
			temp = this.parent.parent;
			this.parent.parent = this;
			this.parent = temp;
		}
	}
}

module.exports = Node;
