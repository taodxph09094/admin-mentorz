export const API_URL_AUTH = "http://203.171.21.153:3000/";
// export const API_URL_AUTH = "http://localhost:3000/";
export const API_URL_EDU = "http://203.171.21.153:3001/";
// export const API_URL_EDU = "http://localhost:3001/";

export const AUTH_URL = {
  LOGIN: "auth/login",
  GET_USERS: "/auth/users/find",
  CREATE_USER: "/auth/users",
};

export const EDU_URL = {
  //University
  GET_UNIVERSITIES: "/edu/educations/find",
  GET_UNIVERSITY_DETAIL: "/edu/educations",
  CREATE_UNIVERSITY: "/edu/educations",
  UPDATE_UNIVERSITY: "/edu/educations",
  CREATE_MAJOR: "/edu/majors",

  //subject
  GET_SUBJECT_DETAIL: "/edu/subjects",

  //test
  GET_TEST_BY_SUBJECT: "/exam/tests/find",
  GET_TEST_DETAIL: "/exam/tests",
  CREATE_TEST: "/exam/questions",
  //courses
  GET_COURSE_BY_SUBJECT: "edu/courses/find",
};
