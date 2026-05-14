
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

	const downloadUrl = new URL(`data:${mediatype};utf8,${encodeURIComponent(saveDoc.content)}`);

	const downloadAnchor = /** @type {HTMLAnchorElement} */ (document.getElementById('download-anchor'));
	downloadAnchor.download = filename;
	downloadAnchor.href = downloadUrl.toString();
	downloadAnchor.click();
	//console.log(url.toString());
	downloadAnchor.href = '';
}



