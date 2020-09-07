class ElementWrapper {
    constructor(type){
        this.root = document.createElement(type);
    }

    setAttributes(name, value){
        this.root.setAttributes(name, value);
    }

    appendChild(component) {
        this.root.appendChild(component.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}

export class Component {
    constructor() {
        this.props = Object.create(null);
        this.childrens = [];
        this._root = null;
    }

    setAttributes(name, value) {
        this.props[name] = value;

    }

    appendChild(compent) {
        this.childrens.push(compent);
    }

    get root(){
        if(!this._root) {
            this._root = this.render().root;
        } 
        return this._root;
    }
}

export function createElement(type, attributes, ...childrens) {
    let e;
    if(typeof type === "string") {
        e = new ElementWrapper(type);
    } else {
        e = new type;
    }
    for(let atr in attributes) {
        e.setAttributes(atr, attributes[atr]);
    }
    let insertChildren = (childrens) => {
        //子元素
        for (let child of childrens) {
            if (typeof child === 'string') {
                child = new TextWrapper(child);
            }
            if (typeof child === 'object' && (child instanceof Array)) {
                insertChildren(child);
            } else {
                e.appendChild(child);
            }
        }
    }
    insertChildren(childrens);
    return e;
}

export function render(compent, parentElement) {
    parentElement.appendChild(compent.root);
}