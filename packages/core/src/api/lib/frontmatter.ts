import { parse as parseYaml, stringify as stringifyYaml, YAMLError, YAMLParseError } from "yaml";

type YamlValue = string | number | boolean | null | YamlValue[] | { [x: string]: YamlValue };
type Data = { [x: string]: YamlValue };

type Parsed = {
  data: Data;
  content: string;
  parseError: null | YAMLParseError | YAMLError;
};

const parse = (content: string): Parsed => {
  // Regex adapted from https://github.com/vfile/vfile-matter and idealized by @iamtrysound
  const match = /^\n+?---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/.exec(content);
  if (match) {
    let data: Data = {};
    let parseError = null;
    try {
      data = parseYaml(match[1], {
        uniqueKeys: false,
      });
      // yaml accept any scalar as root, but in frontmatter we want to treat `data` always as an object.
      // when the root is an scalar, pack it inside a `value` property
      if (typeof data !== "object" || Array.isArray(data)) {
        data = { value: data };
      }
    } catch (e: unknown) {
      if (!(e instanceof YAMLError) && !(e instanceof YAMLParseError)) {
        throw e;
      }
      parseError = e;
    }
    return {
      data,
      content: content.slice(match[0].length),
      parseError,
    };
  }
  return {
    data: {},
    content,
    parseError: null,
  };
};

const stringify = (raw: { data: Data; content: string }) => {
  // extract content-only
  const parsed = parse(raw.content ?? "");
  let content = parsed.content;

  if (raw.data || parsed.data) {
    content = `---\n${stringifyYaml({ ...parsed.data, ...raw.data })}---\n\n${content}`;
  }

  return content;
};

export const frontmatter = { parse, stringify };
