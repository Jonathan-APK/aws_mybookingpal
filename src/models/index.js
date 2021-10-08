// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Facility, User } = initSchema(schema);

export {
  Facility,
  User
};