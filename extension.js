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
              defaultValue: "abcd"
            },
            INDEX: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2
            }
          }
        },
        {
          opcode: "remove_str",
          blockType: Scratch.BlockType.REPORTER,
          text: "[TEXT]から[TARGET]を削除",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "abcd"
            },
            TARGET: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "b"
            }
          }
        }
      ],
      menus: {
        ENCODE_MENU: {
          acceptReporters: true,
          items: ["unicode", "literal", "base64", "hex", "text"],
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
    return text;
  }
  split_(args) {
    const text = args.TEXT
    const index = args.INDEX
    return text.slice(index)
  }
  remove_str(args) {
    const text = args.TEXT
    const target = args.TARGET
    return text.replaceAll(target, "")
  }
}
Scratch.extensions.register(new remi());
