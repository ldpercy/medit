

export class meditDocument {

	/** @type {string} */
	#title;
	/** @type {string} */
	#content;

	get title() { return this.#title;}
	get content() { return this.#content;}

	set title(title) { this.#title = title; }
	set content(content) { this.#content = content; }

}/* meditDocument */








