# react-dojo

## `package.json`

```json
{
  "name": "react-dojo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.4.0",
    "@testing-library/user-event": "^7.2.1",
    "@types/jest": "^24.0.25",
    "@types/node": "^12.12.24",
    "@types/react": "^16.9.17",
    "@types/react-dom": "^16.9.4",
    "prop-types": "^15.7.2",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.3.0",
    "typescript": "^3.7.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "prettier:check": "prettier --check src/**",
    "prettier": "prettier --write src/**"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "airbnb-typescript",
      "plugin:prettier/recommended"
    ]
  },
  "prettier": {
    "singleQuote": true
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "eslint-config-airbnb-typescript": "^6.3.1",
    "eslint-config-prettier": "^6.9.0",
    "eslint-plugin-prettier": "^3.1.2",
    "husky": "^4.0.9",
    "prettier": "^1.19.1",
    "pretty-quick": "^2.0.1"
  },
  "husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged"
    }
  }
}
```

## `eslintignore`

```txt
/*
!/src
```

## `prettierignore`

```txt
/*
!/src
*.svg
```
