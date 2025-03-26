"use client"

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = ({ value, onChange, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <PhoneInput
        country={"in"} // Default country (India)
        value={value}
        onChange={onChange}
        inputStyle={{
          width: "100%",
          height: "42px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          paddingLeft: "50px",
        }}
        containerStyle={{ width: "100%" }}
        buttonStyle={{
          borderRadius: "8px 0 0 8px",
        }}
      />
    </div>
  );
};

export default PhoneNumberInput;
