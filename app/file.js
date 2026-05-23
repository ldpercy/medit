
import * as meditDoc from "./medit-document.js"

import { meditApp } from "./meditApp.js";



let filename	= "medit.md";
let mediatype	= "text/markdown";



/**
 * @param {File} fileObj
 */
export function loadFile(fileObj, callbackFn) {


	//document.forms['fileinput']['fileinput-textarea'].value = fileObj.text();
	//console.log(fileObj.text());		// ugh promise
	console.log(fileObj);

	filename = fileObj.name;
	mediatype = fileObj.type;


	const reader = new FileReader();

	reader.addEventListener(
		"load",
		() => {
			callbackFn(reader.result.toString());
		},
		false,
	);

	if (fileObj) {
		reader.readAsText(fileObj);
	}

}





export function saveDocument() {

	const saveDoc = new meditDoc.meditDocument();

	saveDoc.title = 'medit document'
	saveDoc.content = document.forms['document-form']['main-textarea'].value;

	//console.debug(saveDoc);

	// @ts-ignore
	if (window.showSaveFilePicker) {
		saveUsingFileHandle(saveDoc);
	}
	else {
		saveUsingDownloadAnchor(saveDoc);
	}
}

async function saveUsingFileHandle(saveDoc) {
	console.log('saveUsingFileHandle');
		const opts = {
			types: [
				{
					description: "Text file",
					accept: { "text/plain": [".txt"] },
				},
				{
					description: "Markdown file",
					accept: { "text/markdown": [".md"] },
				},
			],
		};

		// @ts-ignore
		const saveFileHandle = await window.showSaveFilePicker(opts);

		console.log(saveFileHandle);

		const writableStream = await saveFileHandle.createWritable();

		console.log(writableStream);

		// write our file
		await writableStream.write(saveDoc.content);

		// close the file and write the contents to disk.
		await writableStream.close();
}


function saveUsingDownloadAnchor(saveDoc) {
	console.log('saveUsingDownloadAnchor');
	const downloadUrl = new URL(`data:${mediatype};utf8,${encodeURIComponent(saveDoc.content)}`);
	const downloadAnchor = /** @type {HTMLAnchorElement} */ (document.getElementById('download-anchor'));
	downloadAnchor.download = filename;
	downloadAnchor.href = downloadUrl.toString();
	downloadAnchor.click();
	downloadAnchor.href = '';
}


