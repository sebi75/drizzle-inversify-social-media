// to be extended further when needed
export type Context = {
  user: ContextUser;
};

export type ContextUser = {
  id: number;
  email: string;
  role: string;
};
