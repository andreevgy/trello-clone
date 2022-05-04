import React, {FormEvent, useCallback, useId, useState} from "react";
import styles from './CardInput.module.scss';

interface CardInputProps {
  defaultName?: string;
  defaultContent?: string;
  label?: string;
  onSave: (name: string, content: string) => void;
}

const CardInput: React.FC<CardInputProps> = (props) => {
  const { onSave, defaultName = '', defaultContent = '', label = 'Create card' } = props
  const [name, setName] = useState(defaultName);
  const [content, setContent] = useState(defaultContent);
  const nameId = useId();
  const contentId = useId();

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSave(name, content);
    setName('')
    setContent('');
  }, [name, content, onSave]);

  return <form onSubmit={onSubmit} className={styles.cardInput}>
    <b>{label}</b>
    <label htmlFor={nameId}>Card name</label>
    <input id={nameId} value={name} onChange={e => setName(e.target.value)} />
    <label htmlFor={contentId}>Card content</label>
    <input id={contentId} value={content} onChange={e => setContent(e.target.value)} />
    <button type="submit">Save</button>
  </form>
}

export default CardInput;
