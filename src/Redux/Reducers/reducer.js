const initialState = {
  items: [
    {
      id: new Date().getTime(),
      title: "Cooking",
      isUpdating: false,
      isChecked: false,
      errUpdateItemMsg: undefined,
    },
  ],
  errAddItemMsg: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        items: [
          {
            id: action.id,
            title: action.title,
            isUpdating: false,
            isChecked: false,
            errUpdateItemMsg: undefined,
          },
          ...state.items,
        ],
      };

    case "DEL_TASK":
      const updatedTasks = state.items.filter(
        (result, index) => index !== action.id
      );
      return {
        ...state,
        items: updatedTasks,
      };

    case "IS_UPDATING":
      const updatingItems = [...state.items];
      updatingItems[action.index] = {
        ...updatingItems[action.index],
        isUpdating: !updatingItems[action.index].isUpdating,
      };
      return {
        ...state,
        items: updatingItems,
      };

    case "UPDATE_TASK":
      const updatedItems = [...state.items];
      updatedItems[action.index] = {
        ...updatedItems[action.index],
        title: action.title,
        isUpdating: !updatedItems[action.index].isUpdating,
      };
      return {
        ...state,
        items: updatedItems,
      };

    case "SET_ERR_ADD_MSG":
      return {
        ...state,
        errAddItemMsg: action.message,
      };

    case "SET_ERR_UPDATE_MSG":
      const newItems = [...state.items];
      newItems[action.index] = {
        ...newItems[action.index],
        errUpdateItemMsg: action.message,
      };
      return {
        ...state,
        items: newItems,
      };

    case "CHECK_TASK":
      const items = [...state.items]
      items[action.index] = {...items[action.index], isChecked: !items[action.index].isChecked}
      return {
        ...state,
        items: items
      }
  }

  return state;
};

export default reducer;
