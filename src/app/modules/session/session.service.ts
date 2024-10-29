import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';;
import { RtcRole } from 'agora-access-token';
import { generateAgoraToken } from '../../utils/generateAgoraToken';

// const getSessionDetails = async (sessionid: string, studentId: string) => {
//   const session = await prisma.session.findUniqueOrThrow({
//     where: {
//       id: sessionid,
//     },
//     include: {
//       course: {
//         include: {
//           students: true,
//           teacher: {
//             select: { id: true, name: true }, // Adjust this according to your userSelect
//           },
//         },
//       },
//     },
//   });

//   // Check if the student is enrolled in the course
//   if (
//     !session.course.students.some((student) => student.userId === studentId)
//   ) {
//     throw new AppError(httpStatus.FORBIDDEN, 'Access denied');
//   }

//   // Generate Agora Token for the student
//   const uid = 12345; // Ensure uid is a number
//   const role = RtcRole.SUBSCRIBER; // Role for student
//   const channelName = session.channelName;

//   const agoraToken = generateAgoraToken(channelName, uid, role);
//   const frontendUrl = `http://localhost:3000`;
//   const joinLink = `${frontendUrl}/join?channelName=${channelName}&token=${agoraToken}&uid=${uid}`;

//   return { session, agoraToken, joinLink };
// };

// // Function to schedule a session (Admin/Teacher only)
// const scheduleSession = async (
//   courseId: string,
//   startTime: string,
//   endTime: string,
//   channelName: string,
//   id: string,
// ) => {
//   // Generate Agora Token for the teacher
//   const uid = 12345; // Ensure uid is a number
//   const role = RtcRole.PUBLISHER; // Role for teacher

//   const agoraToken = generateAgoraToken(channelName, uid, role);

//   const session = await prisma.session.create({
//     data: {
//       courseId,
//       startTime: new Date(startTime),
//       endTime: new Date(endTime),
//       channelName,
//       streamUrl: agoraToken, // Store token for session reference if needed
//     },
//   });

//   return session;
// };



// Generates session join link and details for students
export const getSessionDetails = async (sessionId: string, studentId: string) => {
  const session = await prisma.session.findUniqueOrThrow({
    where: { id: sessionId },
    include: {
      course: {
        include: {
          students: true,
          teacher: { select: { id: true, name: true } },
        },
      },
    },
  });

  // Ensure student is enrolled
  // if (!session.course.students.some((student) => student.userId === studentId)) {
  //   throw new Error("Access denied");
  // }

  // const channelName = session.channelName;
  const joinLink = `http://localhost:3000/join?sessionId=${sessionId}`;

  return { session, joinLink };
};

// Function to schedule a session
export const scheduleSession = async (
  courseId: string,
  startTime: string,
  endTime: string,
  channelName: string,
  teacherId: string
) => {
  const session = await prisma.session.create({
    data: {
      courseId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      channelName,
      streamUrl:''
      // teacherId,
    },
  });
  const joinLink = `http://localhost:3000/join?sessionId=${session?.id}`;
  return {session,joinLink};
};

export const SessionServices = {
  // createSession,
  getSessionDetails,
  scheduleSession,
};
