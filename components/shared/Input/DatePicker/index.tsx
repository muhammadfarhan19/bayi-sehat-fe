import * as React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import styles from './DatePicker.module.css';

function DatePickerCustom(props: ReactDatePickerProps) {
  return (
    <div className={styles.reactDatePickerContainer}>
      <ReactDatePicker {...props} />
    </div>
  );
}

export default DatePickerCustom;
