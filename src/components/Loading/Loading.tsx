import React, { HTMLAttributes } from "react";
import { useEffect, useState } from "react";
interface IProps extends HTMLAttributes<HTMLSpanElement> {}

const Loading: React.FC<IProps> = ({ ...rest }) => {
  const [length, setLength] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setLength(length === 3 ? 1 : length + 1);
    }, 200);
    return () => clearInterval(interval);
  });
  return (
    <span {...rest} style={{ ...rest.style }}>
      {Array.from({ length }, () => "●").join("")}
    </span>
  );
};
export default Loading;

// import React from "react";
// import "./loading.style.css";
//
// const Loading: React.FC = () => (
//   <div className="loadingio-spinner-ellipsis-obiarpb7lps">
//     <div className="ldio-r1kmbpdgec">
//       <div />
//       <div />
//       <div />
//       <div />
//       <div />
//     </div>
//   </div>
// );
// export default Loading;

/*

* */
