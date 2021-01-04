class Action {

  static addTask = (title) => {
    return {
      type: "ADD_TASK",
      title,
      id: new Date().getTime(),
    };
  };

  static deleteTask = (id) => {
    console.log(id);
    return {
      type: "DEL_TASK",
      id,
    };
  };

  static updateTask = (title, index) => {
    return {
      type: "UPDATE_TASK",
      title,
      index,
    };
  };

  static checkTask = (index) => {
    return {
      type: "CHECK_TASK",
      index,
    };
  };

  static isUpdating = (index) => {
    return {
      type: "IS_UPDATING",
      index,
    };
  };

  static setErrAddMsg = (message) => {
    return {
      type: "SET_ERR_ADD_MSG",
      message,
    };
  };

  static setErrUpdateMsg = (message, index) => {
    return {
      type: "SET_ERR_UPDATE_MSG",
      message,
      index,
    };
  }
}

export default Action;

