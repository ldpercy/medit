//
//	document
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { meditApp } from "./meditApp.js";


let element = {};
const elementMap = {
	page			: 'group-page',
};




class DocumentArea {


	constructor() {
		element = HTMLApp.buildElementMap(document, elementMap);
		HTMLApp.addEventListeners(this.eventListeners, this);
	}

	eventListeners = [
		// {
		// 	query: '#main-svg',
		// 	type: 'click',
		// 	listener: this.svgClickListener
		// },
		// {
		// 	query: '#main-svg',
		// 	type: 'dblclick',
		// 	listener: this.svgDblClickListener //()=>console.log('dblclick')//  // not firing sometimes for some reason???
		// },
	];



}/* PageArea */



export const documentArea = new DocumentArea();