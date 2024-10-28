import { Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { TCourse, TCourseFilterRequest } from './course.interface';
import calculatePagination from '../../utils/calculatePagination';
import { TPaginationOptions } from '../../interface/pagination';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { userSelect } from '../../constants';

// Create a new book.
const createCourse = async (payload: TCourse, teacherId: string) => {
  const result = await prisma.course.create({
    data: {
      ...payload,
      teacherId: teacherId,
    },
  });
  return result;
};

//  Retrieve a list of all course.
const getAllCourse = async (
  params: TCourseFilterRequest,
  options: TPaginationOptions,
) => {
  const { limit, sortBy, sortOrder, skip, page } = calculatePagination(options);
  const andConditions: Prisma.CourseWhereInput[] = [];
  const searchAbleFields = ['name'];
  if (params.searchTerm) {
    andConditions.push({
      OR: searchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Filtering logic excluding searchTerm from filterData
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { searchTerm, ...filterData } = params;

  // Filters
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const searchInputs: Prisma.CourseWhereInput = { AND: andConditions };

  const result = await prisma.course.findMany({
    where: searchInputs,
    skip: skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.course.count({
    where: searchInputs,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCourseById = async (id: string) => {
  const result = await prisma.course.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      students: true,
      teacher: {
        select: userSelect,
      },
      sessions: true,
    },
  });
  return result;
};

const enrolledCourse = async (courseId: string, studentId: string) => {
  // console.log(courseId, studentId);
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      isDeleted: false,
    },
  });
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not exist');
  }
  const user = await prisma.user.findUnique({
    where: {
      id: studentId,
      isDeleted: false,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not exist');
  }
  const result = await prisma.enrollment.create({
    data: {
      courseId,
      userId: studentId,
    },
  });
  return result;
};

const getEnrolledCoursesByUser = async (studentId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: studentId,
      isDeleted: false,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not exist');
  }
  const result = await prisma.enrollment.findMany({
    where: {
      userId: studentId,
      isDeleted: false,
    },
    include: {
      user: {
        select: userSelect,
      },
      course: {
        include: {
          sessions: true,
          teacher: {
            select: userSelect,
          },
        },
      },
    },
  });
  return result;
};

// // Retrieve details of a single book.
// const getSingleBook = async (bookId: number) => {
//   const book = await prisma.book.findUnique({
//     where: {
//       id: bookId,
//     },
//   });
//   if (!book) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Book not exist!');
//   }
//   const result = await prisma.book.findUnique({
//     where: {
//       id: bookId,
//     },
//     include: {
//       author: {
//         include: {
//           user: {
//             select: {
//               id: true,
//               email: true,
//               createdAt: true,
//               updatedAt: true,
//             },
//           },
//         },
//       },
//     },
//   });
//   return result;
// };

// // Update an existing author
// const updateBook = async (bookId: number, payload: Partial<TBook>) => {
//   const book = await prisma.book.findUnique({
//     where: {
//       id: bookId,
//     },
//   });
//   if (!book) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Book not exist!');
//   }
//   const result = await prisma.book.update({
//     where: {
//       id: book.id,
//     },
//     data: payload,
//   });
//   return result;
// };

// // Delete book
// const deleteBook = async (bookId: number) => {
//   const book = await prisma.book.findUnique({
//     where: {
//       id: bookId,
//     },
//   });
//   if (!book) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Book not exist!');
//   }
//   const result = await prisma.book.delete({
//     where: {
//       id: book.id,
//     },
//   });
//   return result;
// };

// // Retrieve a list of all books by a specific author.
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
//       author_id: authorId,
//     },
//   });
//   return result;
// };


const isEnrolledCourse = async (courseId: string, userId: string) => {
  const course = await prisma.course.findUniqueOrThrow({
    where: {
      id: courseId
    },
    include: {
      students: true
    }
  })

  const isEnrolled = course?.students?.some((item) => item?.userId === userId);

  return isEnrolled;
}

const getCourseByTeacher = async (teacherId: string) => {
  const result = await prisma.course.findMany({
    where: {
      teacherId,
      isDeleted: false
    }
  })
  return result;
}
export const CourseServices = {
  createCourse,
  getAllCourse,
  getSingleCourseById,
  enrolledCourse,
  getEnrolledCoursesByUser,
  isEnrolledCourse,
  getCourseByTeacher
};
