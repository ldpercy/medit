import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { meditApp } from "./meditApp.js";




let element;
const elementMap = {
	appForm			: 'form-application',
	appInfoDialog	: 'dialog-appInfo',
	metaThemeColor	: 'meta-themeColor',
	mainTextarea	: 'main-textarea',
};


const introText = `
	Welcome to Medit
	================

	Hope this works!!!
`.replace(/\n\t/g,'\n');


class MainUserInterface {


	constructor() {
		element = HTMLApp.buildElementMap(document, elementMap);
	}

	setup() {
		ui.setColourScheme(localStorage[`${meditApp.appName}_colourScheme`] || 'light');
		if (this.fileInputValue === '') {
			this.editorContent = introText;
		}
	}


	/** @param {string} colourScheme */
	setColourScheme(colourScheme) {
		ui.colourScheme = colourScheme;
		meditApp.setColourScheme(colourScheme);

		// try using the meta element itself as the element to read for colour changes
		element.metaThemeColor.setAttribute('content', window.getComputedStyle(element.metaThemeColor).color);

	}



	/** @returns {string} */
	get editorContent() {
		return document.forms['document-form']['main-textarea'].value;
	}

	/** @param {string} string */
	set editorContent(string) {
		document.forms['document-form']['main-textarea'].value = string;
	}


	/** @returns {string} */
	get fileInputValue() {
		return element.appForm.fileinput.value;
	}


	/** @returns {string} */
	get colourScheme() {
		return element.appForm.colourScheme.value;
	}


	/** @param {string} colourScheme */
	set colourScheme(colourScheme) {
		element.appForm.colourScheme.value = colourScheme;
	}


	toggleAppInfoDialog() {
		element.appInfoDialog.showModal();
	}

}/* MainUserInterface */


export const ui = new MainUserInterface();
