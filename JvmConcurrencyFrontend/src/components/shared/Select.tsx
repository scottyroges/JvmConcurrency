import React, { ChangeEventHandler } from "react";
import { ChevronDown } from "react-feather";
import styles from "./Select.module.css";

function getDisplayedValue(value: string, children: React.ReactNode) {
  const childArray = React.Children.toArray(children) as { props: any }[];
  const selectedChild = childArray.find((child) => child.props.value === value);

  return selectedChild?.props.children;
}

const Select = ({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: ChangeEventHandler;
  children: React.ReactNode;
}) => {
  const displayedValue = getDisplayedValue(value, children);

  return (
    <div className={styles.wrapper}>
      <select
        className={styles.nativeSelect}
        id={id}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
      <div className={styles.presentation}>
        {displayedValue}
        <div
          className={styles.iconWrapper}
          style={{ "--size": 24 + "px" } as React.CSSProperties}
        >
          <ChevronDown
            strokeWidth={2}
            size={24}
            style={{ color: "var(--color-highlight)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Select;
