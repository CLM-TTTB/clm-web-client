## Some packages you might need to know

| Library Name                                                                            | Purpose                       |
| --------------------------------------------------------------------------------------- | ----------------------------- |
| [clsx](https://www.npmjs.com/package/clsx)                                              | To work better with className |
| [react-router-dom](https://www.npmjs.com/package/react-router-dom)                      | To routing your website       |
| [customize-cra](https://www.npmjs.com/package/customize-cra)                            | To config webpack             |
| [css-normalize](https://www.npmjs.com/package/css-normalize)                            | To normalize css              |
| [sass](https://www.npmjs.com/package/sass)                                              | Scss syntax                   |
| [axios](https://github.com/axios/axios)                                                 | Work with api                 |
| [react-toastify](https://github.com/fkhadra/react-toastify)                             | Make toast notification       |
| [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) | To import with alias          |

## How to use

1. Clone this project
2. Run `yarn` or `npm install`
3. Run `yarn start` or `npm start` to start project

## Convention:

#### 1.Work with alias

When you want to import something in src folder, you can use alias like this:

```js
// ~/ this mean that you import from src folder (src/components/Test)
import Test from '~/components/Test';

// instead of
import Test from '../components/Test';
```
