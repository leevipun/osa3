module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2022": true, // Change this to the appropriate ECMAScript version
        "node": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.js", // Change the file extensions here
                ".eslintrc.cjs"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": 2022, // Change this to the appropriate ECMAScript version
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix" // Change this to "auto" if needed
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "arrow-spacing": [
            "error",
            { "before": true, "after": true }
        ],
        "no-console": 0,
    }
}
