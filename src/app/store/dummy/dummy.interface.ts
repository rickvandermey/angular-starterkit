export interface DummyInterface {
	/**
	 * address as AddressInterface
	 */
	address: AddressInterface;
	/**
	 * currency represents the currency code used for DummyInterface
	 */
	currency: string;
	/**
	 * email represents the email used for DummyInterface
	 */
	email: string;
	/**
	 * image will be a dummy image given by an unsplash URI
	 */
	image: string;
	/**
	 * language will determine the default language
	 */
	language: string;
	/**
	 * name represents the name for DummyInterface
	 */
	name: string;
	/**
	 * phone is a default phone number
	 */
	phone: string;
	/**
	 * website represents the URI used for DummyInterface
	 */
	website: string;
}

export interface AddressInterface {
	/**
	 * city represents the city used for the AddressInterface
	 */
	city: string;
	/**
	 * street represents the street used for the AddressInterface
	 */
	street: string;
	/**
	 * streetNumber represents the streetNumber used for the AddressInterface
	 */
	streetNumber: string;
	/**
	 * streetNumberAddition represents the streetNumberAddition used for the AddressInterface
	 */
	streetNumberAddition: string;
	/**
	 * zipcode represents the zipcode used for the AddressInterface
	 */
	zipcode: string;
}

export interface AddressShortInterface {
	/**
	 * city represents the city used for the AddressShortInterface
	 */
	city: string;
	/**
	 * street represents the street with streetNumber and addition used for the AddressShortInterface
	 */
	street: string;
	/**
	 * zipcode represents the zipcode used for the AddressShortInterface
	 */
	zipcode: string;
}
