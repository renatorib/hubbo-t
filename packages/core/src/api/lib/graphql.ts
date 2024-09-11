import { FragmentType, useFragment } from "../__generated__/codegen";
import { TypedDocumentString } from "../__generated__/codegen/graphql";
import { Flatten, Simplify, simplify } from "./types";

export * from "../__generated__/codegen";
export * from "../__generated__/codegen/graphql";

export type VariablesOf<T> = T extends TypedDocumentString<any, infer V> ? V : never;
export type ResultOf<T> = T extends TypedDocumentString<infer R, any> ? R : never;

export type OperationString<Result, Variables, Out> = ReturnType<typeof operationWithMap<Result, Variables, Out>>;
export type TypeString<Result, Variables, Out> = ReturnType<typeof typeWithMap<Result, Variables, Out>>;

// To be used with fragments
export function typeWithMap<Result, Variables, Out>(
  fragment: TypedDocumentString<Result, Variables>,
  _map: (input: Result) => Out,
) {
  type MaskedResult = FragmentType<TypedDocumentString<Result, any>>;

  function map(input: Result): Simplify<Out>;
  function map(input?: Result | null): Simplify<Out> | null;
  function map(input?: Result | null) {
    return input ? simplify(_map(input)) : null;
  }

  function unmask(input: MaskedResult): Simplify<Out>;
  function unmask(input?: MaskedResult | null): Simplify<Out> | null;
  function unmask(input?: (MaskedResult | null)[] | null): Simplify<Out>[];
  function unmask(input?: MaskedResult | (MaskedResult | null)[] | null) {
    if (!input) {
      return null;
    }
    if (Array.isArray(input)) {
      return input.filter((i) => i != null).map((f) => map(useFragment(fragment, f)));
    }
    return map(useFragment(fragment, input));
  }

  return Object.assign(fragment, {
    __is_type: true as const,
    __output: null as any as Simplify<Out>,
    map,
    unmask,
    withMap: <MapOut>(map: (input: Flatten<Result>) => MapOut) => typeWithMap(fragment, map),
  });
}

export function type<Result, Variables>(fragment: TypedDocumentString<Result, Variables>) {
  return typeWithMap(fragment, (input) => simplify(input));
}

// To be used with queries and mutations
export function operationWithMap<Result, Variables, Out>(
  document: TypedDocumentString<Result, Variables>,
  map: (input: Result) => Out,
) {
  return Object.assign(document, {
    __is_operation: true as const,
    __output: null as any as Simplify<Out>,
    map,
    withMap: <MapOut>(map: (input: Flatten<Result>) => MapOut) =>
      operationWithMap(document, (input: Result) => simplify(map(input))),
  });
}

export function operation<Result, Variables>(document: TypedDocumentString<Result, Variables>) {
  return operationWithMap(document, (input) => simplify(input));
}

export const asNode = <T extends { __typename?: string }, N extends T["__typename"]>(
  node: T,
  // @ts-ignore
  name: N,
) => node as Extract<T, { __typename?: N }>;
