import {
  WORKER_OFFSCREEN_CANVAS
} from "./chunk-2JNVDRY5.js";

// node_modules/ol/dom.js
function createCanvasContext2D(width, height, canvasPool, settings) {
  let canvas;
  if (canvasPool && canvasPool.length) {
    canvas = /** @type {HTMLCanvasElement} */
    canvasPool.shift();
  } else if (WORKER_OFFSCREEN_CANVAS) {
    canvas = new OffscreenCanvas(width || 300, height || 300);
  } else {
    canvas = document.createElement("canvas");
  }
  if (width) {
    canvas.width = width;
  }
  if (height) {
    canvas.height = height;
  }
  return (
    /** @type {CanvasRenderingContext2D} */
    canvas.getContext("2d", settings)
  );
}
function releaseCanvas(context) {
  const canvas = context.canvas;
  canvas.width = 1;
  canvas.height = 1;
  context.clearRect(0, 0, 1, 1);
}
function outerWidth(element) {
  let width = element.offsetWidth;
  const style = getComputedStyle(element);
  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
}
function outerHeight(element) {
  let height = element.offsetHeight;
  const style = getComputedStyle(element);
  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
}
function replaceNode(newNode, oldNode) {
  const parent = oldNode.parentNode;
  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
}
function removeNode(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}
function removeChildren(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}
function replaceChildren(node, children) {
  const oldChildren = node.childNodes;
  for (let i = 0; true; ++i) {
    const oldChild = oldChildren[i];
    const newChild = children[i];
    if (!oldChild && !newChild) {
      break;
    }
    if (oldChild === newChild) {
      continue;
    }
    if (!oldChild) {
      node.appendChild(newChild);
      continue;
    }
    if (!newChild) {
      node.removeChild(oldChild);
      --i;
      continue;
    }
    node.insertBefore(newChild, oldChild);
  }
}

// node_modules/ol/size.js
function hasArea(size) {
  return size[0] > 0 && size[1] > 0;
}
function scale(size, ratio, dest) {
  if (dest === void 0) {
    dest = [0, 0];
  }
  dest[0] = size[0] * ratio + 0.5 | 0;
  dest[1] = size[1] * ratio + 0.5 | 0;
  return dest;
}
function toSize(size, dest) {
  if (Array.isArray(size)) {
    return size;
  }
  if (dest === void 0) {
    dest = [size, size];
  } else {
    dest[0] = size;
    dest[1] = size;
  }
  return dest;
}

export {
  createCanvasContext2D,
  releaseCanvas,
  outerWidth,
  outerHeight,
  replaceNode,
  removeNode,
  removeChildren,
  replaceChildren,
  hasArea,
  scale,
  toSize
};
//# sourceMappingURL=chunk-LNGQ7YLP.js.map
