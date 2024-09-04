export type Flatten<T> = { [Key in keyof T]: T[Key] } & {};

export type DeepFlatten<T> = { [Key in keyof T]: DeepFlatten<T[Key]> } & {};

export type Override<Left extends object, Right extends object> = Flatten<Omit<Left, keyof Right> & Right>;

export type Simplify<T> = T extends {} ? Flatten<Omit<T, "__typename" | " $fragmentRefs" | " $fragmentName">> : T;
export const simplify = <T>(t: T) => t as Simplify<T>;

export type IsEmptyObject<T> = T extends {}
  ? keyof T extends never
    ? true
    : T[keyof T] extends never
      ? true
      : false
  : true;

export type DeepPartial<T> = T extends {}
  ? Partial<{
      [Key in keyof T]: DeepPartial<T[Key]>;
    }> & {}
  : T;
