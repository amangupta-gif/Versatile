import React from "react";

export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  style = {},
  children, // for select options or datalist
  as = "input", // "input" | "select" | "textarea"
  rows = 4,
  list,
}) {
  const commonProps = {
    value,
    onChange: (e) => onChange(e.target.value),
    required,
    style,
  };

  return (
    <div>
      {label && <label>{label}</label>}
      {as === "select" ? (
        <select {...commonProps}>{children}</select>
      ) : as === "textarea" ? (
        <textarea rows={rows} placeholder={placeholder} {...commonProps} style={{ resize: "vertical", ...style }} />
      ) : (
        <input type={type} placeholder={placeholder} list={list} {...commonProps} />
      )}
      {children && as === "input" && children}
    </div>
  );
}
