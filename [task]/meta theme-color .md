Meta theme color
================

I don't think I can switch this on color scheme with a media query, so might need to do dynamically.

```
2026-05-29		🎨🌓	new task
```

Problem
-------

Have been trying things like this:

```html
	<meta name="theme-color" content="hsl(178, 60%, 80%)" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="hsl(178, 60%, 20%)" media="(prefers-color-scheme: dark)" />
```

And that would probably for *user preferences*, but not for what I want i want, which is switching on manual scheme changes.

So will probably just change it dynamically.
There are also limitations of what kinds of expressions the meta tag actually accepts.
Some css color functions and constructs (like relative colours) don't appear to work, and it's a bit browser dependant.
I'm only targeting Android chrome right now so whatever works there will be good enough for starters.



Dynamic setting
---------------

Making a little way forward here.

https://stackoverflow.com/questions/41725725/access-css-variable-from-javascript

https://stackoverflow.com/questions/79034015/how-can-i-get-final-hex-color-in-javascript-from-a-relative-css-color-string


This *nearly* works in the colour scheme switcher:
```js
	document.getElementById('meta-themeColor').setAttribute('content', window.getComputedStyle(document.documentElement).backgroundColor);
```

But it seems to be timing sensitive - feels like it's returning values partway through the transition.

Might need to use a proxy element unaffected by a transition to get the computed value immediately.

Or see if the variable can be directly turned into a simple colour string.

