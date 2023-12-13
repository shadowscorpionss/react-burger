import { FC } from 'react';
import styles from './order-images.module.css';


interface IOrderImages {
    icons: Array<string>
}

const maxImageCount: number = 5;
export const OrderImages: FC<IOrderImages> = ({ icons }) => {
    const blurred = icons.length > maxImageCount;
    const rest = icons.length - maxImageCount;

    return (
        <div className={styles.iconsWrapper}>
            {icons
                .slice(0, maxImageCount - 1)
                .map((icon, index) => (
                    <div
                        key={index}
                        className={styles.icon}
                        style={{
                            zIndex: icons.length - index,
                            left: index * 45
                        }}>
                        <img src={icon} />
                    </div>

                ))
            }
            {blurred && (
                <div className={styles.lastIcon}>
                    <div className={`${styles.icon} ${styles.iconBlurred}`}>
                        <img src={icons[5]} />
                    </div>
                    <span className={styles.numbers}>
                        {`+${rest}`}
                    </span>
                </div>
            )}
        </div >
    )
}