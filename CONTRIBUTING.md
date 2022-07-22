# How to contribute to ts-markdown

[ts-markdown](https://github.com/kgar/ts-markdown) uses [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow) for project collaboration:

- Create a branch
- Make changes
- Create a pull request
- Address review comments
- Merge the pull request
- Delete the branch

> **Note**:
>
> If you are not a specified collaborator in the project, be sure to **fork the repo** and then follow the usual GitHub flow guidelines.

## Committing Code

- Open a new GitHub pull request with the changes.
- Ensure the PR description clearly describes the problem/feature/change and the solution. Include the relevant issue number if applicable.
- Before submitting, ensure your changes have _test coverage_ and that _all unit tests pass_.

## Creating GitHub Issues

Feel free to create a GitHub issue if

- 🐞 There's a bug
- 💡 You have a feature idea
- 📃 You'd like to propose changes to config, settings, or documentation
- ❓ You have questions about the code base, and the repository documentation and unit tests are not helping

### 🐞 Did you find a bug?

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/kgar/ts-markdown/issues).

- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/kgar/ts-markdown/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

- If possible, use the relevant bug report templates to create the issue. Simply copy the content of the appropriate template into a Github issue, make the necessary changes to demonstrate the issue, and **paste the content into the issue description**:

  - [**Bug Issue template**](https://github.com/kgar/ts-markdown/blob/main/guids/bug-issue-template.md)
  - ... more to come as we discover them together!

### 📃 Did you fix whitespace, format code, or make a purely cosmetic patch?

I greatly appreciate any assistance in making [ts-markdown](https://github.com/kgar/ts-markdown) look its very best!

#### Fixing Documentation

Expanding, fixing, or improving documentation is valuable in many ways for the contributor:

- It's a great way to get to know the code base
- It provides an opportunity for a contributor to get started in contributing to open source
- It gives the contributor a sense of ownership and builds momentum for more involved pull requests

#### Fixing Code Formatting

[ts-markdown](https://github.com/kgar/ts-markdown)'s code is typically auto-formatted based on [prettier](https://prettier.io/) [config settings](https://github.com/kgar/ts-markdown/blob/main/.prettierrc). Formatting also occurs upon committing to the repo, ensuring a consistent style.

If you would like to change how the code itself is laid out, we're usually talking about a change to the [.prettierrc file](https://github.com/kgar/ts-markdown/blob/main/.prettierrc). To get started on proposing a change to how the code formats, see:

- [**Style Settings Change Issue template**](https://github.com/kgar/ts-markdown/blob/main/guids/style-settings-change-issue-template.md)

### 💡 Do you intend to add a new feature or change an existing one?

To get started with proposing a new feature, check out

- [**Feature Issue template**](https://github.com/kgar/ts-markdown/blob/main/guids/feature-issue-template.md)

If the template doesn't work for your needs, feel free to write your own, providing a description of the feature, reasoning for the feature, and what it should do.

### ❓ Do you have questions about the source code?

If you have questions about the source code, feel free to post an issue with your question. This project is fairly new, and the author is new to open-source software. The maintainers will make a best effort to answer questions.

> **Note**: We've Got Tests 🔬🧪🥼
>
> Check out the unit tests for [ts-markdown](https://github.com/kgar/ts-markdown). They are in files ending in `.test.ts`. These tests provide both an example of how to use the code, as well as entrypoints to debug into the source code.
>
> If you are using [VS code](https://code.visualstudio.com/), check out this [Jest extension](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner); it gives the option to debug into the code from any test or test suite with a clickable link.

## 🙏 Thank You! 🙏

Thanks to all who utilize, contribute to, and report issues for [ts-markdown](https://github.com/kgar/ts-markdown).
