/**
 * @param a A DOM collection.
 * @param predicate The callback function.
 * @returns A new array with all elements where `predicate` returns truthy.
 */
export const filter = (a: NodeListOf<Node> | HTMLCollectionOf<Element>, predicate: (search: Node, index?: number) => boolean) =>
  Array.prototype.filter.call(a, predicate);

/**
 * @param a A DOM collection.
 * @param predicate The callback function.
 * @returns The first item in the given collection where `predicate` returns `true`. `null` if no such item is found.
 */
export const find = (a: NodeListOf<Node> | HTMLCollectionOf<Element>, predicate: (search: Node, index?: number) => boolean) =>
  Array.prototype.find.call(a, predicate);

/**
 * Walks through the given DOM collection and runs the given callback.
 * @param a A DOM collection.
 * @param predicate The callback function.
 */
export const forEach = (a: NodeListOf<Node> | HTMLCollectionOf<Element>, predicate: (search: Element, index?: number) => void) =>
  Array.prototype.forEach.call(a, predicate);

/**
 * @param a A DOM collection.
 * @param item An item in the DOM collection.
 * @returns The index of the first occurence of the given item in the given collection. `-1` if no such item is found.
 */
export const indexOf = (a: NodeListOf<Node> | HTMLCollectionOf<Element>, item: Node) => Array.prototype.indexOf.call(a, item);
