const dataUUIDAttrName = 'data-uuid';

function createHtmlEl(tagName, attrs, dataUUID) {
  const el = document.createElement(tagName);
  Object.entries(attrs).forEach(([, val]) => {
    const { name, value } = val;
    el.setAttribute(name, value);
  });
  el.setAttribute(dataUUIDAttrName, dataUUID);
  return el;
}

function parser(template) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;
  const node = wrapper.firstChild;
  const parentRaw = node.nextSibling;
  const firstDataUUID = '0';
  const parentEl = createHtmlEl(parentRaw.tagName, parentRaw.attributes, firstDataUUID);
  // nestedCollection: contains all the the childNodes with its uuid
  // to locate the nested element for the do-while loop
  const nestedCollection = {};
  // the component-parent-element has the address is '0'
  nestedCollection[firstDataUUID] = { childNodes: parentRaw.childNodes };
  // loop
  do {
    const curKey = Object.keys(nestedCollection)[0];
    const curChildNodes = nestedCollection[curKey].childNodes;
    const queryStr = `[${dataUUIDAttrName}="${curKey}"]`;
    console.log('queryStr', queryStr);
    const curParentEl = curKey === firstDataUUID
      ? parentEl
      : parentEl.querySelector(queryStr);
    console.log('curParentEl', curParentEl);
    curChildNodes.forEach((cNode, index) => {
      // nestedKey: is an unique id to query the parent element
      // and locate the property in the nestedCollection
      const nestedKey = `${curKey}.${index}`;
      console.log('nestedKey', nestedKey);
      const {
        nodeType,
        textContent,
        tagName,
        attributes,
        childNodes,
      } = cNode;
      // nodeType:
      // 1: html tag
      // 3: text
      if (nodeType === 1) {
        const childEl = createHtmlEl(tagName, attributes, nestedKey);
        curParentEl.appendChild(childEl);
        // if this node has child nodes
        // then add to the 'nestedCollection' for the next loop
        nestedCollection[nestedKey] = {
          childNodes,
        };
      }
      if (nodeType === 3) {
        const childEl = document.createTextNode(textContent);
        curParentEl.appendChild(childEl);
      }
    });

    // delete the current child nodes when finish everyloop
    delete nestedCollection[curKey];
  } while (Object.keys(nestedCollection).length > 0);

  console.log('parentEl after added', parentEl);
}

function render() {
  console.log('finish rendering!');
}

export {
  parser,
  render,
};
