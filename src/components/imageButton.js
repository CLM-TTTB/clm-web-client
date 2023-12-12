import { useRef, useState } from 'react';
import styles from '../styles/imageButton.module.css';
import ImageFrame from '../../src/images/ImageFrame.png';

const ImageButton = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
  };

  return (
    <div className={styles.imageButtonContainer}>
      <label className={styles.label}>League Image</label>
      <div className={styles.imageButtonWrapper}>
        <div onClick={handleImageClick} style={{ cursor: 'pointer' }}>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="img-display-after"
            />
          ) : (
            <img src={ImageFrame} className="img-display-before" />
          )}

          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageButton;
