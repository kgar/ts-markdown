(function () {
  let defaultExampleOption = {
    text: 'Choose an example to view it below',
  };

  let examples = [
    defaultExampleOption,
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

      if (optionValue === defaultExampleOption.text) {
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
    return groupName + '-' + text;
  }
})();
