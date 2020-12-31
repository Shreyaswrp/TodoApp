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
    case "Add_Task":
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

    case "Del_Task":
      const updatedTasks = state.items.filter(
        (result, index) => index !== action.id
      );
      return {
        ...state,
        items: updatedTasks,
      };

    case "Is_Updating":
      const updatingItems = [...state.items];
      updatingItems[action.index] = {
        ...updatingItems[action.index],
        isUpdating: !updatingItems[action.index].isUpdating,
      };
      return {
        ...state,
        items: updatingItems,
      };

    case "Update_Task":
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

    case "setErrAddMsg":
      return {
        ...state,
        errAddItemMsg: action.message,
      };

    case "setErrUpdateMsg":
      const newItems = [...state.items];
      newItems[action.index] = {
        ...newItems[action.index],
        errUpdateItemMsg: action.message,
      };
      return {
        ...state,
        items: newItems,
      };

    case "Check_Task":
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
