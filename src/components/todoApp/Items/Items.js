import React from "react";
import { connect } from "react-redux";
import Item from "../Item/Item";

const items = (props) => {
  return (
    <div className="itemsListContainer">
      {props.items.map((item, index) => (
        <Item
          key={item.id}
          title={item.title}
          index={index}
          isUpdating={item.isUpdating}
          isChecked={item.isChecked}
          errUpdateMsg={item.errUpdateItemMsg}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps)(items);
