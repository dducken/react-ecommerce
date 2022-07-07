import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, onChange, errorMessage, ...InputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    // <div className="formStyle">
    //   <input
    //     className="inputs"
    //     {...InputProps}
    //     onChange={onChange}
    //     onBlur={handleFocus}
    //     onFocus={()=>InputProps.name==="confirmPassword" && setFocused(true)}
    //     focused={focused.toString()}
    //   ></input>
    //   <span className="error">{errorMessage}</span>
    // </div>
    <div className="col-sm-12 col-md-6 col-lg-6 mb-3 mt-1">
      <input
        className="inputs"
        {...InputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={()=>InputProps.name==="confirmPassword" && setFocused(true)}
        focused={focused.toString()}
      ></input>
      <span className="error">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
