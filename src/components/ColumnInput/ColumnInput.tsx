import React, {FormEvent, useCallback, useId, useState} from "react";
import styles from './ColumnInput.module.scss';

interface ColumnInputProps {
  onSave: (name: string) => void;
  defaultName?: string;
  label?: string;
}

const ColumnInput: React.FC<ColumnInputProps> = (props) => {
  const { onSave, label = 'Create column', defaultName = '' } = props;
  const [value, setValue] = useState(defaultName);
  const id = useId();

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSave(value);
    setValue('');
  }, [value, onSave]);

  return <form onSubmit={onSubmit} className={styles.columnInput}>
    <label htmlFor={id}>{label}</label>
    <input id={id} value={value} onChange={e => setValue(e.target.value)} />
    <button type="submit">Save</button>
  </form>
}

export default ColumnInput;
