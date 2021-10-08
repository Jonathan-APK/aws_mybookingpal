import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type FacilityMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Facility {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly address: string;
  readonly area: string;
  readonly size: number;
  readonly rate: number;
  readonly description: string;
  readonly opening_hrs: string;
  readonly closing_hrs: string;
  readonly operating_days: (string | null)[];
  readonly userID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Facility, FacilityMetaData>);
  static copyOf(source: Facility, mutator: (draft: MutableModel<Facility, FacilityMetaData>) => MutableModel<Facility, FacilityMetaData> | void): Facility;
}

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly contact?: string;
  readonly address?: string;
  readonly Facilities?: (Facility | null)[];
  readonly role?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}