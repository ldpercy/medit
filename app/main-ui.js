import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { meditApp } from "./meditApp.js";




let element;
const elementMap = {
	appForm		: 'form-application',
	appInfoDialog	: 'dialog-appInfo',
};



class MainUserInterface {


	constructor() {
		element = HTMLApp.buildElementMap(document, elementMap);
	}






	/** @returns {string} */
	get colourScheme() {
		return element.appForm.colourScheme.value;
	}


	/** @param {string} colourScheme */
	set colourScheme(colourScheme) {
		element.appForm.colourScheme.value = colourScheme;
		meditApp.setColourScheme(colourScheme);
	}


	toggleAppInfoDialog() {
		element.appInfoDialog.showModal();
	}

}/* MainUserInterface */


export const ui = new MainUserInterface();
