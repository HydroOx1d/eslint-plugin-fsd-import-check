# eslint-plugin-fsd-import-check

linting import in FSD porjects

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd-import-checker`:

```sh
npm install eslint-plugin-fsd-import-check --save-dev
```

## Usage

Add `fsd-import-checker` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fsd-import-check"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fsd-import-check/rule-name": 2
    }
}
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->
