//
//	controller.js
//


import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { meditApp } from "./meditApp.js";
import { ui } from './main-ui.js';
// import { documentArea } from "./document-area.js";
import * as file from "./file.js"





class Controller {

	constructor() {
		this.element = HTMLApp.buildElementMap(document, this.elementMap)
		HTMLApp.addEventListeners(this.eventListeners, this);
		this.keyboardHandler = HTMLApp.newKeyboardHandler(this.keyFunctionMap,this);
	}


	elementMap = {
		// appInfoDialog	: 'dialog-appInfo',
		downloadAnchor		: 'download-anchor',
		metaThemeColor		: 'meta-themeColor',
	};


	/** @type {array} */
	eventListeners = [
		{
			element: document.forms['application']['fileinput'],
			type: 'change',
			listener: (event) => { this.loadFile(event.target.files[0]); }
		},
		{
			query: '.colourScheme-selector',
			type: 'click',
			listener: (event) => { ui.setColourScheme(event.target.dataset.colourscheme); }
		},
		{
			element: document,
			type: 'visibilitychange',
			listener: () => { meditApp.visibilitychangeListener(); }
		},
		{
			element: document,
			type: 'keydown',
			//listener: this.keyboardHandler							//	Use this for a local keyboard handler
			listener: (event) => { this.keyboardHandler(event); }		//	Use this for one generated from HTMLApp
		},
		{
			query: 'textarea',
			type: 'keydown',
			listener: (event)=>event.stopPropagation()
		},
		{
			query: '#button-save',
			type: 'click',
			listener: file.saveDocument,
		},
		{
			query: '#button-showAppInfo',
			type: 'click',
			listener: ui.toggleAppInfoDialog,
		},

	];/* eventListeners */


	//
	//	event listeners
	//



	keyFunctionMap = {

		'?'	: ui.toggleAppInfoDialog,
	};


	documentKeyListener(event) {
		//console.log('documentKeyListener', event);

		if (!event.altKey && !event.ctrlKey && !event.metaKey) {

			if (this.keyFunctionMap[event.key]) {
				event.preventDefault();
				this.keyFunctionMap[event.key]();
			}
		}

	}/* documentKeyListener */



	//
	//	handlers
	//


	/**@param {File} inputFile */
	loadFile(inputFile) {
		file.loadFile(inputFile, this.fileLoaded);
	}



	/** @param {string} fileContent */
	fileLoaded(fileContent) {
		// this will then display a text file
		//content.innerText = reader.result;
		//document.forms['fileinput']['fileinput-textarea'].value = reader.result;
		ui.editorContent = fileContent;
	}




	zoomIn() {
		//console.log('zoomIn');
		//ui.zoom++;
		//documentArea.updatePageTransform();
	}

	zoomOut() {
		//console.log('zoomOut');
		//ui.zoom--;
		//documentArea.updatePageTransform();
	}


	saveDocument() {

		const documentContent = ui.editorContent;

		const url = new URL(`data:text/plain;utf8,${encodeURIComponent(documentContent)}`);
		this.element.downloadAnchor.href = url.toString();
		this.element.downloadAnchor.click();
		//console.log(url.toString());
		this.element.downloadAnchor.href = '';
	}


} /* Controller  */


export const controller = new Controller();