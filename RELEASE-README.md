## `ts-markdown` Release Checklist

1. Ensure all the changes for the next release are in `main` branch
1. Run the github action [Bump version](https://github.com/kgar/ts-markdown/actions/workflows/version-bump.yml) with the new target version
1. Review and approve the generated PR
1. Now that `main` branch is updated to the latest version, [draft a new release](https://github.com/kgar/ts-markdown/releases/new)
1. Select a new tag name that matches the new version
1. Generate release notes and add any extra notes for personalization
1. Publish the release
   - This will trigger the github action [Publish to NPM](https://github.com/kgar/ts-markdown/actions/workflows/npm-publish.yml) and put the latest out there
