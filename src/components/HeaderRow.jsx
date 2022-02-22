import React from "react";
import "./HeaderRow.scss";

function HeaderRow({ side }) {
  const sequence = ["price", "count", "amount", "total"];

  return (
    <div className={`row header ${side}`}>
      {sequence.map((type, i) => (
        <div key={type + i} className={type}>
          {type}
        </div>
      ))}
    </div>
  );
}

export default HeaderRow;
