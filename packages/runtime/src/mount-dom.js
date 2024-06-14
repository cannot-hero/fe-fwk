import { DOM_TYPES } from './h';
import { setAttributes } from './attributes';
import { addEventListeners } from './events';

export function mountDom(vdom, parentEl) {
    switch (vdom.type) {
        case DOM_TYPES.TEXT: {
            createTextNode(vdom, parentEl);
            break;
        }
        case DOM_TYPES.ELEMENT: {
            createElementNode(vdom, parentEl);
            break;
        }
        case DOM_TYPES.FRAGMENT: {
            createFragmentNode(vdom, parentEl);
            break;
        }
        default: {
            throw new Error(`unknown type: ${vdom.type}`);
        }
    }
}

function createTextNode(vdom, parentEl) {
    const { value } = vdom;
    // create a text node
    const textNode = document.createTextNode(value);
    // a reference to the text node
    vdom.el = textNode;
    // append the text node
    parentEl.appendChild(textNode);
}

function createElementNode(vdom, parentEl) {
    const { tag, props, children } = vdom;

    const element = document.createElement(tag);
    // add attributes
    addProps(element, props, vdom);
    vdom.el = element;
    children.forEach((child) => {
        mountDom(child, element);
    });

    parentEl.appendChild(element);
}

function createFragmentNode(vdom, parentEl) {
    const { children } = vdom;
    // use a reference to the parent element
    vdom.el = parentEl;
    // append the children
    children.forEach((child) => {
        mountDom(child, parentEl);
    });
}

function addProps(el, props, vdom) {
    // split listeners from attributes
    const { on: events, ...attrs } = props;
    // add listeners
    vdom.listeners = addEventListeners(events, el);
    // set attributes
    setAttributes(el, attrs);
}
