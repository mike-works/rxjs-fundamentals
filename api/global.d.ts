declare module '*.json' {
  import { Value as JSONValue } from 'json-typescript';
  const val: JSONValue;
  export default val;
}
