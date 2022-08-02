(function () {
  function render() {
    let outputEl = document.getElementById('ts-markdown-output');
    let inputEl = document.getElementById('ts-markdown-json-input');
    try {
      let jsonText = inputEl.value;

      let json = JSON.parse(jsonText);

      let markdown = tsMarkdown.tsMarkdown(json);

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
  // Wire up option dropdown changed

  render();
})();
