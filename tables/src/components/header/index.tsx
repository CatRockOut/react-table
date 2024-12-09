import styles from './styles.module.css'

export const Header = () => {
    return (
        <thead className={styles.thead}>
            <tr>
                <th className={styles.theadCell}>head 1</th>
                <th className={styles.theadCell}>head 2</th>
                <th className={styles.theadCell}>head 3</th>
            </tr>
        </thead>
    );
};
