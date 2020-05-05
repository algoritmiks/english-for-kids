module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
      "linebreak-style": 0,
      "no-use-before-define": 0,
      "no-else-return": 0,
      "class-methods-use-this": 0,
      "prefer-destructuring": 0,
      "consistent-return": 0,
      "import/no-cycle": 0,
      "object-curly-newline": 0,
      "arrow-body-style": 0,
      "no-unused-expressions": 0,
      "no-lonely-if": 0,
      "no-plusplus": 0,
      "no-mixed-operators": 0,
      "max-len": 0,
    }
};