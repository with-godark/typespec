model User {
  id: int64;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;

  /** User Status */
  userStatus: int32;
}
