export interface TagChangeType {
  create: Set<string>;
  update: Map<string, string>;
  delete: Set<string>;
}
