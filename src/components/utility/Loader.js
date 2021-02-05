import React from "react";
export default function Loader(props) {
  return (
    <div className={props.type}>
      <span className="spinner" />
    </div>
  );
}
