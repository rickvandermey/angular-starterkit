/**
 * NotificationInterface is the interface representing a notification
 *
 * @interface
 */
export interface NotificationInterface {
	/**
	 * id represents the unique id of the notification
	 */
	id?: number;
	/**
	 * timeStamp of the notification that has been sent
	 */
	timeStamp: Date;
	/**
	 * prettyTimeStamp prettifies the timeStamp
	 */
	prettyTimeStamp?: string;
	/**
	 * body of the notification
	 */
	body: string;
	/**
	 * title of the notification
	 */
	title: string;
	/**
	 * type of the notification, for example success, warning, danger, info
	 */
	type: string;
}
