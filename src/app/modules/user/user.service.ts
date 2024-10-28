import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';
import { TUser } from './user.interface';
import { UserRole } from '@prisma/client';

// create user and author
const createUser = async (payload: TUser) => {
  // secure password
  const hashPassword = bcrypt.hashSync(payload.password, 12);
  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashPassword,
  };

  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return result;
};
const createTeacher = async (payload: TUser) => {
  // secure password
  const hashPassword = bcrypt.hashSync(payload.password, 12);
  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashPassword,
    role: UserRole.TEACHER,
  };

  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return result;
};

const getAllUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};

// //  Retrieve a list of all authors.
// const getAllAuthors = async (
//   params: TAuthorFilterRequest,
//   options: TPaginationOptions,
// ) => {
//   const { limit, sortBy, sortOrder, skip, page } = calculatePagination(options);
//   const andConditions: Prisma.AuthorWhereInput[] = [];
//   const searchAbleFields = ['name'];
//   if (params.searchTerm) {
//     andConditions.push({
//       OR: searchAbleFields.map((field) => ({
//         [field]: {
//           contains: params.searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }

//   // Filtering logic excluding searchTerm from filterData
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { searchTerm, ...filterData } = params;

//   // Filters
//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map((key) => ({
//         [key]: {
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           equals: (filterData as any)[key],
//         },
//       })),
//     });
//   }

//   const searchInputs: Prisma.AuthorWhereInput = { AND: andConditions };

//   const result = await prisma.author.findMany({
//     where: searchInputs,
//     include: {
//       book: true,
//     },
//     skip: skip,
//     take: limit,
//     orderBy: {
//       [sortBy]: sortOrder,
//     },
//   });
//   const total = await prisma.author.count({
//     where: searchInputs,
//   });

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

// // Retrieve details of a single author.
// const getSingleAuthor = async (authorId: number) => {
//   const author = await prisma.author.findUnique({
//     where: {
//       id: authorId,
//     },
//   });
//   if (!author) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Author not exist!');
//   }
//   const result = await prisma.author.findUnique({
//     where: {
//       id: authorId,
//     },
//     include: {
//       user: {
//         select: {
//           id: true,
//           email: true,
//           createdAt: true,
//           updatedAt: true,
//         },
//       },
//       book: true,
//     },
//   });
//   return result;
// };

// // Update an existing author
// const updateAuthor = async (authorId: number, payload: Partial<TAuthor>) => {
//   const author = await prisma.author.findUnique({
//     where: {
//       id: authorId,
//     },
//   });
//   if (!author) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Author not exist!');
//   }
//   const result = await prisma.author.update({
//     where: {
//       id: author.id,
//     },
//     data: payload,
//   });
//   return result;
// };

// // Delete an author
// const deleteAuthor = async (authorId: number) => {
//   const author = await prisma.author.findUnique({
//     where: {
//       id: authorId,
//     },
//   });
//   if (!author) {
//     throw new AppError(httpStatus.NOT_FOUND, 'author not found');
//   }
//   const result = await prisma.author.delete({
//     where: {
//       id: author.id,
//     },
//   });
//   return result;
// };

// //  Retrieve a list of all books written by a specific author.
// const getAllBooksByAuthor = async (authorId: number) => {
//   const author = await prisma.author.findUnique({
//     where: {
//       id: authorId,
//     },
//   });
//   if (!author) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Author not exist!');
//   }
//   const result = await prisma.book.findMany({
//     where: {
//       author_id: authorId
//     }
//   })
//   return result;
// }
export const UserServices = {
  createUser,
  createTeacher,
  getAllUser,
};
