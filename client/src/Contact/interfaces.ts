export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface PointOfContact {
  name: string;
  email: string;
  mobile: string;
  designation: string;
}

export default interface Organization {
  organizationName: string;
  address: Address;
  industryType: string;
  website: string;
  pointsOfContact: PointOfContact[];
  source: string;
  [key: string]: any; // Add index signature
}