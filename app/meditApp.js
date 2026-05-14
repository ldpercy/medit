//
//	meditApp.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";

import { controller} from './controller.js';
import { documentArea } from './document-area.js';
import { ui } from './main-ui.js';


class MeditApp extends HTMLApp {

	appName			= 'Medit';
	appVersion		= 'v0.0.0';
	projectColour	= 'mediumturquoise';
	appInfo = [`%c
		Medit ${this.appVersion} by ldpercy
		https://github.com/ldpercy/medit/releases/tag/${this.appVersion}
		`.replace(/\n\t/g,'\n'),
		`color: light-dark(hsl(from ${this.projectColour} h s 30), hsl(from ${this.projectColour} h s 70));`,
	];


	filename	= "medit.md";


	/** @type {object} */
	elementMap = {
		commandInput	: 'input-command',
		pageForm		: 'form-page',
		page			: 'group-page',
	};



	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		//ui.colourScheme = localStorage[`${this.appName}_colourScheme`] || 'light';
		this.loadSettings();
		this.setup();
	}/* documentDOMContentLoaded */



	setup() {

	}



	// controller methods



	/** @param {string} fileContent */
	fileLoaded(fileContent) {
		// this will then display a text file
		//content.innerText = reader.result;
		//document.forms['fileinput']['fileinput-textarea'].value = reader.result;
		document.forms['document-form']['main-textarea'].value = fileContent;
	}




	//
	// application lifecycle
	//


	visibilitychangeListener() {
		//console.debug('visibilitychangeListener', arguments);
		//console.debug('document.visibilityState', document.visibilityState);
		if (document.visibilityState === 'hidden')
		{
			this.saveSettings();
		}
	}


	/* saveSettings
	*/
	saveSettings() {

		// Note caveats: https://stackoverflow.com/a/55874235

		const appSettings = {
			//page	: this.getFormData(this.element.pageForm),
			//drawing	: this.getFormData(this.element.drawingForm),
		};

		//console.log(appSettings);

		const appSettingsJson = JSON.stringify(appSettings);
		localStorage.setItem(`${this.appName}_settings`, appSettingsJson );
		localStorage.setItem(`${this.appName}_savedAt`, new Date().toISOString());
		//.log('Settings saved');
	}/* saveSettings */


	loadSettings() {
		//console.log('Settings loaded');

		if (localStorage[`${this.appName}_settings`]) {

			const appSettings = JSON.parse(localStorage[`${this.appName}_settings`]);
			//this.populateForm(this.element.turtleForm, appSettings.turtle);
			//this.populateForm(this.element.pageForm, appSettings.page);
			//this.populateForm(this.element.drawingForm, appSettings.drawing);
		}
		else {
			// first load
		}

		localStorage.setItem(`${this.appName}_loadedAt`, new Date().toISOString());
	}/* loadSettings */




}/* meditApp */




export const meditApp = new MeditApp();

