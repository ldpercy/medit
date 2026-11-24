//
//	meditApp.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { controller} from './controller.js';
import { documentArea } from './document-area.js';
import { ui } from './main-ui.js';

import projectStyle from "../style/project.css" with { type: 'css' };
// currently getting syntax/lint errors with either form of css import;
// not sure yet which is 'better' here, slightly leaning towards this static style if the squigglies can be sorted out
import project from '../project.js';


class MeditApp extends HTMLApp {

	appName			= 'Medit';
	appVersion		= '0.3_dev';
	projectColour;



	/** @type {object} */
	elementMap = {
		commandInput	: 'input-command',
		pageForm		: 'form-page',
		page			: 'group-page',
	};



	async documentDOMContentLoaded() {

		/* there are still  */

		//let projectStyle = (await import("../style/project.css", { with: { type: "css" }})).default;
		/* Chrome doesn't like stylesheets imported like this to have their own @import's in them, so better to keep imported styles v.simple */

		console.log(projectStyle);
		this.projectColour = projectStyle.cssRules[0].style.getPropertyValue('--project-colour');

		this.appInfo = [`%c
			Medit ${this.appVersion} by ldpercy
			https://github.com/ldpercy/medit/releases/tag/${this.appVersion}
			`.replace(/\n\t/g,'\n'),
			`color: light-dark(hsl(from ${this.projectColour} h s 30), hsl(from ${this.projectColour} h s 70));`,
		];

		super.documentDOMContentLoaded();
		this.setup();
	}/* documentDOMContentLoaded */



	setup() {
		this.loadSettings();
		ui.setup();
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

