import { catchAsync } from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { UserServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';

// create student
const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

// create teacher
const createTeacher = catchAsync(async (req, res) => {
  const result = await UserServices.createTeacher(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Teacher created successfully',
    data: result,
  });
});
// get all user
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieve successfully',
    data: result,
  });
});

// // Retrieve a list of all authors.
// const getAllAuthors = catchAsync(async (req, res) => {
//   const filters = pick(req.query, ['searchTerm', 'name']);
//   // for pagination
//   const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
//   const result = await AuthorServices.getAllAuthors(filters, options);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Author retrieve successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// // Retrieve details of a single author.
// const getSingleAuthor = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await AuthorServices.getSingleAuthor(Number(id));
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Author retrieve successfully',
//     data: result,
//   });
// });

// // Update an existing author.
// const updateAuthor = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await AuthorServices.updateAuthor(Number(id), req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Author updated successfully',
//     data: result,
//   });
// });

// // Delete an author
// const deleteAuthor = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await AuthorServices.deleteAuthor(Number(id));
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Author deleted successfully',
//     data: result,
//   });
// });

// //  Retrieve a list of all books written by a specific author.
// const getAllBooksByAuthor = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await AuthorServices.getAllBooksByAuthor(Number(id));
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Books retrieve successfully',
//     data: result,
//   });
// });

export const UserControllers = {
  createUser,
  createTeacher,
  getAllUser,
};
