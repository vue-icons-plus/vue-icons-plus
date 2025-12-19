<img src="https://raw.githubusercontent.com/vue-icons-plus/vue-icons-plus/main/packages/preview/public/vue-icons.svg" style="margin-left: 42px;" width="120" alt="Vue Icons">

# [Vue Icons Plus](https://github.com/vue-icons-plus)



[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/badge/yarn-3.6.1-brightgreen
[npm-url]: https://www.npmjs.com/package/vue-icons-plus

 
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/vue-icons-plus/vue-icons-plus)
 

Vue icons plus icons total 50000+, support Vue 3/Vue 2.7+, allowing you to easily import and use them directly in Vue projects.

## Installation (for standard modern project)

```bash
yarn add vue-icons-plus
# or
npm install vue-icons-plus --save
```

### Example usage for Vue 3

```jsx
<script>
  import { FaBeer } from "vue-icons-plus/fa";
</script>

<template>
  <div>
    <FaBeer />
  </div>
</template>

```

### Example usage for Vue ^2.7

```jsx
<script>
  import { FaBeer } from "vue-icons-plus/fa";
  export default {
    components: {
      FaBeer
    }
  }
</script>

<template>
  <div>
    <FaBeer />
  </div>
</template>

```

### Example usage for Uniapp

```jsx
<template>
  <view>
    <BiSearch />
  </view>
</template>

<script lang="uts">
  import { BiSearch } from 'vue-icons-plus/bi';
  export default {
    components: {
      BiSearch
    },
  }
</script>
```

[View the documentation](https://vue-icons.com) for further usage examples and how to use icons from other packages. _NOTE_: each Icon package has it's own subfolder under `vue-icons-plus` you import from.

For example, to use an icon from **Material Design**, your import would be: `import { ICON_NAME } from 'vue-icons-plus/md';`

## Installation (for Webpack 3, etc)

> Due to npm restrictions, only supports: `ai`、`bi`、`bs`、`cg`、`ci`、`di`、`fa`、`fa6`、`fc`、`fi`、`gi`、`go`、`gr`、`hi`、`hi2`、`im`、`io`、`lia`.

If your project grows in size, this option is available. This method has the trade-off that it takes a long time to install the package.

```bash
yarn add @vue-icons-plus/all-files
# or
npm install @vue-icons-plus/all-files --save
```

### Example usage for Vue 3

```jsx
<script>
  import { FaBeer } from "@vue-icons-plus/all-files/fa/FaBeer";
</script>

<template>
  <div>
    <FaBeer />
  </div>
</template>
```

### Example usage for Vue ^2.7

```jsx
<script>
  import { FaBeer } from "@vue-icons-plus/all-files/fa/FaBeer";
  export defautls {
    components: {
      FaBeer
    }
  }
</script>

<template>
  <div>
    <FaBeer />
  </div>
</template>

```

## Icons

| Icon Library                                                             | License                                                                                           | Version                                  | Count |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----: |
| [Circum Icons](https://circumicons.com/)                                 | [MPL-2.0 license](https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE)                 | v2.0.2-22-gcec1364                       |   288 |
| [Font Awesome 5](https://fontawesome.com/)                               | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                                 | 5.15.4-3-gafecf2a                        |  1612 |
| [Font Awesome 6](https://fontawesome.com/)                               | [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)                                 | 6.5.2                                    |  2045 |
| [Ionicons 4](https://ionicons.com/)                                      | [MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)                                 | 7.2.2                                    |  1338 |
| [Ionicons 5](https://ionicons.com/)                                      | [MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)                                 | 5.5.4                                    |  1332 |
| [Material Design icons](http://google.github.io/material-design-icons/)  | [Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE) | 4.0.0-98-g9beae745bb                     |  4341 |
| [Typicons](http://s-ings.com/typicons/)                                  | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)                                   | v2.1.2                                   |   336 |
| [Github Octicons icons](https://octicons.github.com/)                    | [MIT](https://github.com/primer/octicons/blob/master/LICENSE)                                     | 19.8.0                                   |   273 |
| [Feather](https://feathericons.com/)                                     | [MIT](https://github.com/feathericons/feather/blob/master/LICENSE)                                | 4.29.1                                   |   287 |
| [Lucide](https://lucide.dev/)                                            | [ISC](https://github.com/lucide-icons/lucide/blob/main/LICENSE)                                   | 0.303.0                                  |  1368 |
| [Game Icons](https://game-icons.net/)                                    | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)                                         | 12920d6565588f0512542a3cb0cdfd36a497f910 |  4040 |
| [Weather Icons](https://erikflowers.github.io/weather-icons/)            | [SIL OFL 1.1](http://scripts.sil.org/OFL)                                                         | 2.0.12-7-gbb80982                        |   219 |
| [Devicons](https://vorillaz.github.io/devicons/)                         | [MIT](https://opensource.org/licenses/MIT)                                                        | 1.8.0                                    |   192 |
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons)       | [MIT](https://opensource.org/licenses/MIT)                                                        | @ant-design/icons-svg@4.0.0-207-g655d46e |   831 |
| [Bootstrap Icons](https://github.com/twbs/icons)                         | [MIT](https://opensource.org/licenses/MIT)                                                        | v1.11.3-29-g92b6aee                      |  2716 |
| [Remix Icon](https://github.com/Remix-Design/RemixIcon)                  | [Apache License Version 2.0](http://www.apache.org/licenses/)                                     | v4.2.0-4-ge252d6e                        |  2860 |
| [Flat Color Icons](https://github.com/icons8/flat-color-icons)           | [MIT](https://opensource.org/licenses/MIT)                                                        | v1.0.2-27-g8eccbbb                       |   329 |
| [Grommet-Icons](https://github.com/grommet/grommet-icons)                | [Apache License Version 2.0](http://www.apache.org/licenses/)                                     | v4.12.1-3-gbfb6355                       |   635 |
| [Heroicons](https://github.com/tailwindlabs/heroicons)                   | [MIT](https://opensource.org/licenses/MIT)                                                        | v1.0.6-3-gb6de579                        |   460 |
| [Heroicons 2](https://github.com/tailwindlabs/heroicons)                 | [MIT](https://opensource.org/licenses/MIT)                                                        | v2.1.3-1-g9a17872                        |   888 |
| [Simple Icons](https://simpleicons.org/)                                 | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)                           | 4.14.0-2428-ga1df74e                     |  3124 |
| [Simple Line Icons](https://thesabbir.github.io/simple-line-icons/)      | [MIT](https://opensource.org/licenses/MIT)                                                        | v2.5.5                                   |   189 |
| [IcoMoon Free](https://github.com/Keyamoon/IcoMoon-Free)                 | [CC BY 4.0 License](https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt)             | d006795ede82361e1bac1ee76f215cf1dc51e4ca |   491 |
| [BoxIcons](https://github.com/atisawd/boxicons)                          | [MIT](https://github.com/atisawd/boxicons/blob/master/LICENSE)                                    | 9ffa9136e8681886bb7bd2145cd4098717ce1c11 |  1634 |
| [css.gg](https://github.com/astrit/css.gg)                               | [MIT](https://opensource.org/licenses/MIT)                                                        | 2.1.1-1-gdeea4fa                         |   704 |
| [VS Code Icons](https://github.com/microsoft/vscode-codicons)            | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                         | 0.0.35-41-g05f8886                       |   461 |
| [Tabler Icons](https://github.com/tabler/tabler-icons)                   | [MIT](https://opensource.org/licenses/MIT)                                                        | v3.2.0-1-g4ec2a71                        |  5237 |
| [Themify Icons](https://github.com/lykmapipo/themify-icons)              | [MIT](https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE)    | v0.1.2-2-g9600186                        |   352 |
| [Radix Icons](https://icons.radix-ui.com)                                | [MIT](https://github.com/radix-ui/icons/blob/master/LICENSE)                                      | @radix-ui/react-icons@1.3.0-1-g94b3fcf   |   318 |
| [Phosphor Icons](https://github.com/phosphor-icons/core)                 | [MIT](https://github.com/phosphor-icons/core/blob/main/LICENSE)                                   | v2.0.8-9-gfe23e25                        |  9072 |
| [Icons8 Line Awesome](https://icons8.com/line-awesome)                   | [MIT](https://github.com/icons8/line-awesome/blob/master/LICENSE.md)                              | v1.2.1-10-g78a1012                       |  1544 |
| [IconPark](https://iconpark.oceanengine.com/home)                        | [Apache License Version 2.0](https://github.com/bytedance/IconPark/blob/master/LICENSE)           | 1.0.0                                    |  2658 |
| [Element Plus Icons](https://github.com/element-plus/element-plus-icons) | [MIT](https://github.com/element-plus/element-plus-icons/blob/main/LICENSE)                       | 2.3.1                                    |   293 |

You can add more icons by submitting pull requests or creating issues.

## Configuration

You can change the size, color, and so on of icons through props.

```jsx
<script>
  import { FaBeer } from "vue-icons-plus/fa";
</script>

<template>
  <div>
    <FaBeer size="48" color="#333" />
  </div>
</template>

```

### Props

| Key         | Default               | Notes                        |
| ----------- | --------------------- | ---------------------------- |
| `color`     | `undefined` (inherit) |                              |
| `size`      | `24`                  |                              |
| `className` | `undefined`           |                              |
| `style`     | `undefined`           | Can overwrite size and color |

## Contributing

### Development

```bash
yarn
cd packages/core
yarn fetch  # fetch icon sources
yarn build
```

## Licence

MIT

- Icons are taken from the other projects so please check each project licences accordingly.
