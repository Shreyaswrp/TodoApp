export const addTask = (title) => {
  return {
    type: "ADD_TASK",
    title,
    id: new Date().getTime(),
  };
};

export const deleteTask = (id) => {
  console.log(id);
  return {
    type: "DEL_TASK",
    id,
  };
};

export const updateTask = (title, index) => {
  return {
    type: "UPDATE_TASK",
    title,
    index,
  };
};

export const checkTask = (index) => {
  return {
    type: "CHECK_TASK",
    index,
  };
};

export const isUpdating = (index) => {
  return {
    type: "IS_UPDATING",
    index,
  };
};

export const setErrAddMsg = (message) => {
  return {
    type: "SET_ERR_ADD_MSG",
    message,
  };
};

export const setErrUpdateMsg = (message, index) => {
  return {
    type: "SET_ERR_UPDATE_MSG",
    message,
    index,
  };
};
