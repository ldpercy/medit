
import * as meditDoc from "./medit-document.js"

import { meditApp } from "./meditApp.js";




/**
 * @param {File} fileObj
 */
export function loadFile(fileObj, callbackFn) {


	//document.forms['fileinput']['fileinput-textarea'].value = fileObj.text();
	//console.log(fileObj.text());		// ugh promise
	//console.log(fileObj);

	meditApp.filename = fileObj.name;

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

	const downloadUrl = new URL(`data:text/plain;utf8,${encodeURIComponent(saveDoc.content)}`);

	const downloadAnchor = /** @type {HTMLAnchorElement} */ (document.getElementById('download-anchor'));
	downloadAnchor.download = meditApp.filename;
	downloadAnchor.href = downloadUrl.toString();
	downloadAnchor.click();
	//console.log(url.toString());
	downloadAnchor.href = '';
}



