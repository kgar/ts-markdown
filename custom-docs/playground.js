(function () {
  let defaultExampleOption = {
    text: 'Choose an example to view it below',
  };

  let examples = [
    defaultExampleOption,
    {
      group: 'Blockquote',
      text: 'Example',
      json: `[
  {
    "blockquote": "Hello, world!"
  }
]`,
    },
    {
      group: 'Blockquote',
      text: 'Example with options',
      json: `[
  {
    "blockquote": "Hello, world!",
    "append": "^in-obdisian-this-is-a-block-id"
  }
]`,
    },
    {
      group: 'Bold',
      text: 'Example',
      json: `[
  {
    "bold": "Hello, world!"
  }
]`,
    },
    {
      group: 'Bold',
      text: 'Example with options',
      json: `[
  {
    "bold": "Hello, world!",
    "indicator": "_"
  }
]`,
    },
    {
      group: 'Code',
      text: 'Example',
      json: `[
  {
    "code": "Hello, world!"
  }
]`,
    },
    {
      group: 'Codeblock',
      text: 'Example',
      json: `[
  {
    "codeblock": "const hello = 'hello';\\nconst world = 'world';\\nconsole.error(hello + ', ' + world + '!')\\n\\n// Note: In JSON, you have to stringify multi-line content. In regular JavaScript or TypeScript, you can use the template \`\` style string 👍"
  }
]
`,
    },
    {
      group: 'Codeblock',
      text: 'Example with Options',
      json: `[
  {
    "codeblock": "const hello = 'hello';\\nconst world = 'world';\\nconsole.error(hello + ', ' + world + '!')\\n\\n// Note: In JSON, you have to stringify multi-line content. In regular JavaScript or TypeScript, you can use the template \`\` style string 👍",
    "language": "js",
    "fenced": true
  }
]
`,
    },
    {
      group: 'Description List',
      text: 'Example',
      json: `[
  {
    "dl": [
      {
        "dt": "First Term"
      },
      {
        "dd": "This is the definition of the first term."
      }
    ]
  }
]`,
    },
    {
      group: 'Description List',
      text: 'Example with options',
      json: `[
  {
    "dl": [
      {
        "dt": "First Term"
      },
      {
        "dd": "This is the definition of the first term."
      }
    ],
    "html": true
  }
]
`,
    },
    {
      group: 'Emoji',
      text: 'Example',
      json: `[
  {
    "emoji": "joy"
  }
]`,
    },
    {
      group: 'Footnote',
      text: 'Example',
      json: `[
  {
    "footnote": {
      "id": "1",
      "content": "This is a footnote."
    }
  }
]
`,
    },
    {
      group: 'Footnote',
      text: 'Example with Multi-line Content',
      json: `[
  {
    "footnote": {
      "id": "bignote",
      "content": [
        { "p": "Here's one with multiple paragraphs and code." },
        { "p": "Indent paragraphs to include them in the footnote." },
        { "p": { "text": [
  {
     "code": "{ my code }" }] 
    }
},
        { "p": "Add as many paragraphs as you like." }
      ]
    }
  }
]`,
    },
    {
      group: 'Footnote',
      text: 'Example in context',
      json: `[
  {
    "h1": "Doing the Work"
  },
  {
    "p": "We use footnotes in the midst of other text, typically. In the next paragraph, we'll see a footnote in action."
  },
  {
    "p": [
      "Let's do the work",
      {
        "footnote": {
          "id": "1",
          "content": "Is it really work, though?"
        }
      },
      "!"
    ]
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H1 Example',
      json: `[
  {
    "h1": "Hello, world!"
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H1 Example with options',
      json: `[
  {
    "h1": "Hello, world!", "underline": true, "id": "a-greeting"
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H2 Example',
      json: `[
  {
    "h2": "Hello, world!"
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H2 Example with options',
      json: `[
  {
    "h2": "Hello, world!", "underline": true, "id": "a-second-greeting"
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H3 Example',
      json: `[
  {
    "h3": "Hello, world!"
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H3 Example with options',
      json: `[
  {
    "h3": "Hello, world!", "id": "a-third-greeting"
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H4 Example',
      json: `[
  {
    "h4": "Hello, world!"
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H4 Example with options',
      json: `[
  {
    "h4": "Hello, world!", "id": "a-fourth-greeting"
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H5 Example',
      json: `[
  {
    "h5": "Hello, world!"
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H5 Example with options',
      json: `[
  {
    "h5": "Hello, world!", "id": "a-fifth-greeting"
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H6 Example',
      json: `[
  {
    "h6": "Hello, world!"
  }
]`,
    },
    {
      group: 'Headers',
      text: 'H6 Example with options',
      json: `[
  {
    "h6": "Hello, world!", "id": "a-sixth-greeting"
  }
]`,
    },
    {
      group: 'Highlight',
      text: 'Example',
      json: `[
  {
    "highlight": "Hello, highlighted text!"
  }
]`,
    },
    {
      group: 'Horizontal Rule',
      text: 'Example',
      json: `[
  {
    "hr": true
  }
]`,
    },
    {
      group: 'Image',
      text: 'Example',
      json: `[
  {
    "img": {
      "source": "https://via.placeholder.com/25"
    }
  }
]
`,
    },
    {
      group: 'Image',
      text: 'Example with options',
      json: `[
  {
    "img": {
      "source": "https://via.placeholder.com/25",
      "alt": "A 25x25 placeholder image",
      "title": "Here is a handy placeholder image"
    }
  }
]
`,
    },
    {
      group: 'Italic',
      text: 'Example',
      json: `[
  {
    "italic": "Hello, world!"
  }
]`,
    },
    {
      group: 'Italic',
      text: 'Example with options',
      json: `[
  {
    "italic": "Hello, world!",
    "indicator": "_"
  }
]
`,
    },
    {
      group: '',
      text: '',
      json: ``,
    },
    {
      group: '',
      text: '',
      json: ``,
    },
    {
      group: '',
      text: '',
      json: ``,
    },
    {
      group: '',
      text: '',
      json: ``,
    },
    {
      group: '',
      text: '',
      json: ``,
    },
  ];

  initExamples(examples);

  function render() {
    let outputEl = document.getElementById('ts-markdown-output');
    try {
      let options = getOptions();
      let markdown = getMarkdown(options);

      outputEl.value = markdown;
      outputEl.classList.remove('error');
    } catch (e) {
      outputEl.value = e;
      outputEl.classList.add('error');
    }
  }

  // Wire up ts-markdown-json-input changed
  document
    .getElementById('ts-markdown-json-input')
    .addEventListener('keyup', function () {
      render();
    });

  document
    .getElementById('examples-selector')
    .addEventListener('change', function (event) {
      let optionValue = event.target.options[event.target.selectedIndex].value;

      if (
        optionValue ===
        createOptionValue(defaultExampleOption.group, defaultExampleOption.text)
      ) {
        return;
      }

      let exampleJson = examples.find(
        (x) => createOptionValue(x.group, x.text) === optionValue
      ).json;
      document.getElementById('ts-markdown-json-input').value = exampleJson;
    });

  [
    'unordered-list-item-indicator',
    'examples-selector',
    'use-h1-underlining',
    'use-h2-underlining',
    'use-subscript-html',
    'use-superscript-html',
    'use-codeblock-fencing',
    'bold-indicator',
    'italic-indicator',
  ].forEach((selectId) => {
    document.getElementById(selectId).addEventListener('change', render);
  });

  render();

  function getOptions() {
    return {
      unorderedListItemIndicator: getSelectedOptionValue(
        'unordered-list-item-indicator'
      ),
      useH1Underlining: getSelectedOptionValue('use-h1-underlining'),
      useH2Underlining: getSelectedOptionValue('use-h2-underlining'),
      useSubscriptHtml: getSelectedOptionValue('use-subscript-html'),
      useSuperscriptHtml: getSelectedOptionValue('use-superscript-html'),
      useDescriptionListHtml: getSelectedOptionValue(
        'use-description-list-html'
      ),
      useCodeblockFencing: getSelectedOptionValue('use-codeblock-fencing'),
      boldIndicator: getSelectedOptionValue('bold-indicator'),
      italicIndicator: getSelectedOptionValue('italic-indicator'),
    };
  }

  function getSelectedOptionValue(id) {
    let select = document.getElementById(id);
    return select.selectedIndex === 0
      ? undefined
      : select.options[select.selectedIndex].value;
  }

  function getMarkdown(options) {
    let inputEl = document.getElementById('ts-markdown-json-input');
    let jsonText = inputEl.value;

    let json = JSON.parse(jsonText);

    let markdown = tsMarkdown.tsMarkdown(json, options);
    return markdown;
  }

  function initExamples(examples) {
    let groupMap = new Map();

    examples.forEach(function (example) {
      let groupName = example.group || '';
      if (!groupMap.has(groupName)) {
        groupMap.set(groupName, []);
      }
      let group = groupMap.get(groupName);
      let option = document.createElement('option');
      option.text = example.text;
      option.value = createOptionValue(groupName, example.text);
      group.push(option);
    });

    let examplesSelector = document.getElementById('examples-selector');
    Array.from(groupMap).forEach(function (group) {
      let groupName = group[0];
      let options = group[1];

      if (groupName === '') {
        options.forEach(function (option) {
          examplesSelector.add(option);
        });

        return;
      }

      let optionGroup = document.createElement('optgroup');
      optionGroup.label = groupName;
      options.forEach(function (option) {
        optionGroup.appendChild(option);
      });
      examplesSelector.add(optionGroup);
    });
  }

  function createOptionValue(groupName, text) {
    return (groupName || '') + '-' + text;
  }
})();
