#stylelint

## CSS-in-JS

### Disabling stylelint for tsx

```
       "extends": "stylelint-config-standard",
       "rules": {
             "indentation": 2
-      }
+      },
+      "ignoreFiles": ["**/*.tsx"]
 }

```