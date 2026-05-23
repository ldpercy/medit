Android overwrite
=================

Can't overwrite files on download on android

```
2026-05-15		🤖🖫⑴	new task
```

Problem
-------

So far both firefox and chrome on Android will append '(1)', '(2)' etc to the downloaded filename if the file already exists, which badly hobbles how useful this is going to be on mobile.
I haven't found any way yet to opt for file overwrite instead.
* Nothing I can see in browser settings for either to change the behaviour
* There is a ff extension that appears to offer this functionality, but is desktop only afaict
	https://github.com/zach-adams/downloads-overwrite-already-existing-files

Appears extensions for ff android are a small approved list.
More info and a suggested workaround here:
https://www.androidpolice.com/install-add-on-extension-mozilla-firefox-android/


Alternatively for now I could swerve to local storage, and just use downloads as a backup???

Other possible leads:
* https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker
* https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream




FileHandle
----------

https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle


The browser support for some of the file apis is a bit mixed, esp for firefox; chrome should be okay.

FileSystemFileHandle is supported by ff, but showSaveFilePicker *isn't*, which afaict is the only way to create the handle... ???
There might be another way or something I'm missing.


I've added in a switch to use `window.showSaveFilePicker` if present, and fallback to the old download link if not.

Just noticed Chrome show this in the title of the save dialog:

	"Warning: this site can see edits you make"

Bit scary sounding.
