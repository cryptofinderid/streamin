import React, { useState } from "react"
import styles from "../styles/Select.module.css"

const Select = ({ options, value, onChange, placeholder = "Pilih..." }) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (val) => {
    onChange(val)
    setOpen(false)
  }

  return (
    <div className={styles.selectWrapper}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        type="button"
      >
        {value ? options.find((o) => o.value === value)?.label : placeholder}
        <span className={styles.caret}>&#9662;</span>
      </button>
      {open && (
        <ul className={styles.dropdown}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.item} ${
                option.value === value ? styles.selected : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
