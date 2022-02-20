import httpHelper from "./httpserviceutils/HttpHelper";

export const getAllComments = (courseId) => {
  return httpHelper.get(`v1/Comments/${courseId}`);
};

export const saveComment = (comment) => {
  return httpHelper.post("v1/Comments", comment);
};
