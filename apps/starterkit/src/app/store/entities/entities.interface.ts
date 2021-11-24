export interface EntityInterface {
	guid: string;
	country: string;
	currency: string;
	dateFormat: string;
	deeperObject: {
		nestedAfterMap: string;
		nestedBeforeMap: string;
	};
	email: string;
	markdown: string;
}
