import { withoutNulls } from './utils/arrays';

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
};

/**
 *  h() to create element nodes that take three arguments:
 * @param tag —The element’s tag name
 * @param props —An object with its attributes (which we’ll call props, for properties)
 * @param children —An array of its children nodes
 */
export function h(tag, props = {}, children = []) {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT,
    };
}

/**
 * A function that maps text nodes.
 *
 * @param {Array} children - The array of children nodes to map.
 * @return {Array} The mapped array of children nodes.
 */
function mapTextNodes(children) {
    return children.map((child) => {
        typeof child === 'string' ? hString(child) : child;
    });
}

export function hString(str) {
    return {
        type: DOM_TYPES.TEXT,
        value: str,
    };
}

export function hFragment(vNodes) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes)),
    };
}
