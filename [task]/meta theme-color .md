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




