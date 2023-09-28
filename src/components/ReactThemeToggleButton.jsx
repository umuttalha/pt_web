import React from "react";
import styles from "./styles.module.css";

const defaultOptions = {
  invertedIconLogic: false
};

const ReactThemeToggleButton = ({
  isDark,
  onChange,
  invertedIconLogic = defaultOptions.invertedIconLogic
}) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label
    className={styles.container}
    title={isDark ? "Activate light mode" : "Activate dark mode"}
    aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
  >
    <input
      type="checkbox"
      defaultChecked={invertedIconLogic ? !isDark : isDark}
      onChange={onChange}
    />
    <div />
  </label>
);

export default ReactThemeToggleButton;
