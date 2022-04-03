import httpHelper from "./httpserviceutils/HttpHelper";

export const getAllCourse = () => {
  return httpHelper.get(`v1/Course`);
};

export const saveCourse = (course) => {
  return httpHelper.post("v1/Course", course);
};

export const updateCourse = (course) => {
  return httpHelper.put("v1/Course", course);
};

export const uploadFile = (formData) => {
  return httpHelper.post("v1/Course/upload", formData);
};
