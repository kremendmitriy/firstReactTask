import { useState } from 'react';
import styles from './App.module.css';

export default function App() {
   const [value, setValue] = useState('');
   const [list, setList] = useState([]);
   const [error, setError] = useState('');

   const isValueVaild = value.length >= 3 ? true : false;
   const updatedList = [
      ...list,
      { id: Date.now(), value, time: new Date().toLocaleString() },
   ];

   function onInputButtonClick() {
      const promptValue = prompt('Введите значение:');
      promptValue.length >= 3
         ? setValue(promptValue)
         : setError('Введенное значение должно содержать минимум 3 символа');
   }

   function onAddButtonClick() {
      if (isValueVaild) {
         setList(updatedList);
         console.log(updatedList);
         setValue('');
         setError('');
      }
   }
   return (
      <>
         <div className={styles.app}>
            <h1 className={styles.pageHeading}>Ввод значения</h1>
            <p className={styles.noMarginText}>
               Текущее значение <code>{value}</code>
               <output className={styles.currentValue}></output>
            </p>
            {error !== '' && <div className={styles.error}>{error}</div>}
            <div className={styles.buttonsContainer}>
               <button className={styles.button} onClick={onInputButtonClick}>
                  Ввести новое
               </button>
               <button
                  className={styles.button}
                  disabled={!isValueVaild}
                  onClick={onAddButtonClick}
               >
                  Добавить в список
               </button>
            </div>
            {list.length > 0 ? (
               <div className={styles.listContainer}>
                  <h2 className={styles.listHeading}>Список:</h2>
                  <ul className={styles.list}>
                     {list.map((item) => {
                        return (
                           <li key={item.id} className={styles.listItem}>
                              <strong>{item.value}</strong>, Дата добавления:{' '}
                              {item.time}
                           </li>
                        );
                     })}
                  </ul>
               </div>
            ) : (
               <p className={styles.noMarginText}>Нет добавленных элементов</p>
            )}
         </div>
      </>
   );
}
