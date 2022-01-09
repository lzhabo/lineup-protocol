import React from "react";
import ReactSwitch, { ReactSwitchProps } from "react-switch";

const SwitchBox: React.FC<ReactSwitchProps> = (props) => {
  return (
    <ReactSwitch
      {...props}
      checkedIcon={false}
      handleDiameter={18}
      height={24}
      offColor="#2A2A32"
      uncheckedIcon={false}
      width={40}
      onColor="#666DE3"
    />
  );
};
export default SwitchBox;
