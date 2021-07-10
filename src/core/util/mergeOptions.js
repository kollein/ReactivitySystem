export function mergeOptions(vm, options) {
  const mergedOptions = {};
  options.render((component) => {
    // console.log('component', component);
    const script = component;
    const { name, data } = script;
    mergedOptions[name] = {
      // trigger data() here
      $data: data(),
    };
    // bring all the options up to the highest level of object
    // data
    Object.entries(mergedOptions[name].$data).forEach(([key, val]) => {
      vm[key] = val;
    });
  });
}

export function getContentByTag(component, tag) {
  const tagStart = `<${tag}>`;
  const tagEnd = `</${tag}>`;
  const pos0 = component.indexOf(tagStart);
  const pos1 = component.indexOf(tagEnd);
  let result = component.slice(pos0, pos1).replace(tagStart, '');
  if (tag === 'script') {
    result = result.replace('export default', '');
    result = eval(`(${result})`);
  }
  return result;
}
