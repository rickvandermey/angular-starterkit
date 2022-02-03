import * as dayjs from 'dayjs';

/**
 * Generic helper which is used to convert various test related units
 */
export class ConversionHelper {
	/**
	 * Converts a count e.g. fifth to an index e.g. 5
	 *
	 * @param {string} count
	 * @returns {number}
	 */
	static convertCountToIndex(count: string): number {
		const numbers = [
			'first',
			'second',
			'third',
			'fourth',
			'fifth',
			'sixth',
			'seventh',
			'eighth',
			'ninth',
			'tenth',
			'eleventh',
			'twelfth',
			'thirteenth',
			'fourteenth',
			'fifteenth',
			'sixteenth',
			'seventeenth',
			'eighteenth',
		];

		return numbers.indexOf(count.trim().toLowerCase());
	}

	/**
	 * Converts a given datestring to another format
	 * @param {string} dateString - e.g. (21-02-2019)
	 * @param {string} inputFormat - e.g. (DD-MM-YYYY)
	 * @param {string} outputFormat - e.g. (MMMM D, YYYY)
	 * @returns {string}
	 */
	static convertDateStringToDateString(
		dateString: string,
		inputFormat: string,
		outputFormat: string,
	): string {
		const temp = this.convertStringToDate(dateString, inputFormat);
		return this.convertDateToString(temp, outputFormat);
	}

	/**
	 * Converts the given string to a date with the specified format
	 * @param {string} dateString - string representation of a date example: "2018-04-11"
	 * @param {string} format - "YYYY-MM-DD"
	 * @returns {Date}
	 */
	static convertStringToDate(dateString: string, format: string): Date {
		// Doing this the oldfashioned way because dayjs seems to swap date and month
		const dateArray = dateString.split('-');
		switch (format) {
			case 'MMMM D':
				return dayjs(dateString, format).add(12, 'hour').toDate();
			case 'DD-MM-YYYY':
				return new Date(
					Number(dateArray[2]),
					Number(dateArray[1]) - 1,
					Number(dateArray[0]),
					12,
				);
			case 'YYYY-MM-DD':
				return dayjs(dateString, format).add(12, 'hour').toDate();
			default:
				console.error(`Invalid format supplied: ${format}`);
				return null;
		}
	}

	/**
	 * Converts a Javascript date to  a string based on the supplied formatting
	 * @param {Date} date
	 * @param {string} format
	 * @returns {string}
	 */
	static convertDateToString(date: Date, format: string): string {
		return dayjs(date).format(format);
	}

	/**
	 * Converts a human readable Hotel name to the IDPMS code
	 * @param {string} name
	 * @returns {string}
	 */
	static convertHotelNameToHotelCode(name: string): string {
		switch (name) {
			case 'Veenendaal':
				return 'vee';
			case 'Linstow':
				return 'lin';
			case 'Sassenheim':
				return 'sas';
			default:
				return 'bre';
		}
	}

	/**
	 * Converts a human readable language name to the ISO code
	 * @param {string} name
	 * @returns {string}
	 */
	static convertLanguageNameToLanguageCode(name: string): string {
		switch (name) {
			case 'Dutch':
				return 'nl';
			case 'French':
				return 'fr';
			case 'German':
				return 'de';
			default:
				return 'en';
		}
	}

	/**
	 * getRGBAByColor converts a human readable color to RGBA
	 * @param {string} color - the pretty named color
	 * @returns {string}
	 */
	static getRGBAByColor(color: string): string {
		switch (color) {
			case 'blue':
				return 'rgba(74, 145, 227, 1)';
			case 'dark blue':
				return 'rgba(29, 66, 109, 1)';
			case 'green':
				return 'rgba(80, 226, 195, 1)';
			case 'lightgreen':
				return 'rgba(220, 239, 199, 1)';
			case 'magenta':
				return 'rgba(224, 31, 131, 1)';
			case 'orange':
				return 'rgba(255, 102, 0, 1)';
			case 'pink':
				return 'rgba(242, 161, 236, 1)';
			default:
				return 'rgba(0, 0, 0, 1)';
		}
	}
}
