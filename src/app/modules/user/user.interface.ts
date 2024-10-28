export type TUser = {
  id: string;
  name: string; // Optional field
  email: string;
  password: string;
  role: 'ADMIN' | 'USER' | 'TEACHER';
};

// export type TAuthorFilterRequest = {
//   searchTerm?: string | undefined;
//   name?: string | undefined;
// };
