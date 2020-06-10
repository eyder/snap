global.tag = (tagName, id, clazz, content) => {
  return `<${tagName} ${id ? `id="${id}"`: ''} ${clazz ? `class="${clazz}"`: ''}>${content}</${tagName}>`;
}

global.div = (id, clazz, content) => {
  return global.tag('div', id, clazz, content);
}
