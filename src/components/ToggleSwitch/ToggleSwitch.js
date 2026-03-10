import React, {useContext} from "react";
import emoji from "react-easy-emoji";
import StyleContext from "../../contexts/StyleContext";
import "./ToggleSwitch.scss";

/* eslint-disable react/prop-types */

/**
 * mode: "theme" or "lang"
 * checked: boolean (controlled, optional for legacy theme mode)
 * onToggle: callback fired when toggled
 * leftLabel, rightLabel: what to show within the handle (string or node)
 */
const ToggleSwitch = ({
  mode = "theme",
  checked,
  onToggle,
  leftLabel,
  rightLabel
}) => {
  // Theme mode: fallback to context, legacy for backward compatibility
  const styleContext = useContext(StyleContext);
  const isContextTheme = mode === "theme" && checked === undefined;
  const value = isContextTheme ? styleContext.isDark : checked;

  function handleToggle() {
    if (isContextTheme) {
      styleContext.changeTheme();
    } else if (typeof onToggle === "function") {
      onToggle();
    }
  }

  let displayLabel;
  if (mode === "theme") {
    displayLabel = value ? emoji("🌜") : emoji("☀️");
  } else if (mode === "lang") {
    displayLabel = value ? rightLabel : leftLabel;
  }

  return (
    <label className="switch">
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          border: 0
        }}
      >
        Toggle switch
      </span>
      <input
        type="checkbox"
        checked={!!value}
        onChange={handleToggle}
      />
      <span className="slider round">
        <span className="emoji">{displayLabel}</span>
      </span>
    </label>
  );
};

export default ToggleSwitch;
