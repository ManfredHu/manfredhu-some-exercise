复现一个bug

当tailwindcss样式注入在 自己写的样式后面时, 样式会冲突

```css
/* tailwind inject here, all is ok */
/* @tailwind base;
@tailwind components;
@tailwind utilities; */

body {
    background-color: lightblue;
}



.button-by-components {
    background: pink;
}

/* when you inject tailwind here, button will lose background */
@tailwind base;
@tailwind components;
@tailwind utilities;
```