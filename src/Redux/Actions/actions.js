export const addTask = (title) => {
  return {
    type: "Add_Task",
    title,
    id: new Date().getTime(),
  };
};

export const deleteTask = (id) => {
  console.log(id);
  return {
    type: "Del_Task",
    id,
  };
};

export const updateTask = (title, index) => {
  return {
    type: "Update_Task",
    title,
    index,
  };
};

export const checkTask = (index) => {
  return {
    type: "Check_Task",
    index,
  };
};

export const isUpdating = (index) => {
  return {
    type: "Is_Updating",
    index,
  };
};

export const setErrAddMsg = (message) => {
  return {
    type: "setErrAddMsg",
    message,
  };
};

export const setErrUpdateMsg = (message, index) => {
  return {
    type: "setErrUpdateMsg",
    message,
    index,
  };
};
