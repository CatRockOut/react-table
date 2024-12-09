import styles from './styles.module.css'

export const Body = () => {
    return (
        <tbody className={styles.tbody}>
            <tr>
                <td className={styles.tbodyCell}>body 1</td>
                <td className={styles.tbodyCell}>body 2</td>
                <td className={styles.tbodyCell}>body 3</td>
            </tr>
            <tr>
                <td className={styles.tbodyCell}>body 4</td>
                <td className={styles.tbodyCell}>body 5</td>
                <td className={styles.tbodyCell}>body 6</td>
            </tr>
        </tbody>
    );
};
