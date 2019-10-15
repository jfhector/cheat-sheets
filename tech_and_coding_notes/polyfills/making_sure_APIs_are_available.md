# Making sure that Web / JS apis I'm using are available in the target environment

### From https://github.com/edenspiekermann/edenspiekermann-storybook-starter

You can use any modern JavaScript in your components that can be automatically transpiled. The Babel configuration is set up to recognize ES2017 and beyond. Be aware that if you use non-transpilable modern JavaScript functions like Object.entries or similiar, you need to manually (e.g. with babel/polyfill) or automatically (e.g. with polyfill.io) include a polyfill in your target repository so that browsers can understand your code.

### Philip Walton's description of the problem and strategy

https://philipwalton.com/articles/loading-polyfills-only-when-needed/


