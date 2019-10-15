# Prototyping techniques

## For breadboard prototyping

```
/* COLOUR PALETTE */

:root {
    --color_azureRadiance: #007bff;
}

/* STYLE PRESETS */

html {
    font-size: 16px;
    font-family: system-ui, sans-serif;
}

body {
    background-color: hsl(0, 0%, 98%);
    margin: 0;
}

p {
    margin: 0;
    user-select: none;
}

* {
    box-sizing: border-box;
}

div {
    user-select: none;
    margin: 12px;
}

div[id='root'] {
    margin: 0;
}

button {
    height: 40px;
    border-radius: 5px;
    font-size: 16px;
    margin-right: 10px;
    cursor: pointer;
    background-color: white;
    border: 1px solid var(--color_azureRadiance);
    color: var(--color_azureRadiance);
}

button[disabled] {
    color: hsl(0, 0%, 70%);
    border-color: hsl(0, 0%, 70%);
    cursor: default;
}

input[type='text'] {
    height: 30px;
    font-size: 16px;
    margin-right: 20px;
}

a {
    text-decoration: underline;
    color: var(--color_azureRadiance);
    cursor: pointer;
}

label {
    margin-bottom: 5px;
    margin-right: 8px;
}
```

### Note: For breadboading UI, I also just in rare cases class names, for very basic components.
These are defined in `App.css`

```
.card {
    margin: 15px;
    border: 2px solid hsl(0, 0%, 80%);
    background-color: white;
    cursor: pointer;
    padding: 4px;
}
.card--interactive {
    border: 1px solid var(--color_azureRadiance);
}
```