class remi {
  getInfo() {
    return {
      id: "remi",
      name: "remi's extension",
      blocks: [
        {
          opcode: "toFormat",
          blockType: Scratch.BlockType.REPORTER,
          text: "[TEXT] to [ENCODE]",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "a",
            },
            ENCODE: {
              type: Scratch.ArgumentType.STRING,
              menu: "ENCODE_MENU",
            },
          },
        },
        {
          opcode: "split_",
          blockType: Scratch.BlockType.REPORTER,
          text: "[TEXT]の[INDEX]以下を切り取る",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "abcd",
            },
            INDEX: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2,
            },
          },
        },
        {
          opcode: "remove_str",
          blockType: Scratch.BlockType.REPORTER,
          text: "[TEXT]から[TARGET]を削除",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "abcd",
            },
            TARGET: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "b",
            },
          },
        },
        {
          opcode: "regexTest",
          blockType: Scratch.BlockType.BOOLEAN,
          text: "[TEXT] は [PATTERN] にマッチ?",
          arguments: {
            TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "hello" },
            PATTERN: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "h.*o",
            },
          },
        },
        {
          opcode: "replace_",
          blockType: REPORTER,
          text: "[TEXT]の[TARGET]を[REPLACE]で置き換える。 Regexモード: [REGEX_MODE]",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "you are an ID**T",
            },
            TARGET: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "ID\\*\\*T",
            },
            REPLACE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "#####",
            },
            REGEX_MODE: {
              type: Scratch.ArgumentType.BOOLEAN,
              defaultValue: false,
            },
          },
        },
        {
          opcode: "slice_",
          blockType: REPORTER,
          text: "[TEXT]の[START]から[END]",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "###remiria###",
            },
            START: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 4,
            },
            END: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 10,
            },
          },
        },
      ],
      menus: {
        ENCODE_MENU: {
          acceptReporters: true,
          items: ["unicode", "literal", "base64", "hex", "utf8", "lower", "upper"],
        },
        BOOLEAN_MENU: {
          acceptReporters: true,
          items: ["true", "false"],
        },
      },
    };
  }

  toFormat(args) {
    const text = args.TEXT;
    const format = args.ENCODE;

    if (format === "unicode") {
      return Array.from(text)
        .map((ch) => "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0"))
        .join("");
    }
    if (format === "hex") {
      return Array.from(text)
        .map((ch) => ch.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(" ");
    }
    if (format === "base64") {
      return btoa(text);
    }
    if (format === "literal") {
      return Array.from(text)
        .map((ch) => "\\x" + ch.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("");
    }
    if (format === "lower") {
      return text.toLowerCase();
    }
    if (format === "upper") {
      return text.toUpperCase();
    }    
    if (format === "utf8") {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(text);
      return Array.from(bytes)
        .map((b) => "\\x" + b.toString(16).padStart(2, "0"))
        .join("");
    }
  }
  split_(args) {
    const text = args.TEXT;
    const index = args.INDEX;
    return text.slice(index);
  }
  remove_str(args) {
    const text = args.TEXT;
    const target = args.TARGET;
    return text.replaceAll(target, "");
  }
  regexTest(args) {
    try {
      const reg = new RegExp(args.PATTERN);
      return reg.test(args.TEXT);
    } catch (e) {
      return false;
    }
  }
  replace_(args) {
    const text = args.TEXT;
    const target = args.TARGET;
    const replace = args.REPLACE;
    const regexMode = args.REGEX_MODE;

    if (regexMode) {
      try {
        const reg = new RegExp(target, "g");
        return text.replace(reg, replace);
      } catch (e) {
        return text;
      }
    } else {
      return text.split(target).join(replace);
    }
  }
  slice_(args) {
    const text = args.TEXT;
    const start = args.START;
    const end = args.END;

    const s = Math.max(0, Math.min(text.length, Math.floor(start)));
    const e = Math.max(s, Math.min(text.length, Math.floor(end)));
    return text.slice(s, e);
  }
}
Scratch.extensions.register(new remi());
