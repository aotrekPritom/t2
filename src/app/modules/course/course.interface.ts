export type TCourse = {
  name: string;
  description?: string;
  price: number;
};

export type TCourseFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
};
