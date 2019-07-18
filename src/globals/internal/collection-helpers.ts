/**
 * @param a A DOM collection.
 * @param predicate The callback function.
 * @returns The first item in the given collection where `predicate` returns `true`. `null` if no such item is found.
 */
export const find = (a: NodeListOf<Node> | HTMLCollectionOf<Element>, predicate: (search: Node) => boolean) =>
  Array.prototype.find.call(a, predicate);

/**
 * Walks through the given DOM collection and runs the given callback.
 * @param a A DOM collection.
 * @param predicate The callback function.
 */
export const forEach = (a: NodeListOf<Node> | HTMLCollectionOf<Element>, predicate: (search: Element) => void) =>
  Array.prototype.forEach.call(a, predicate);
