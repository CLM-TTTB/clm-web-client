import { useRef, useState } from 'react';
import styles from '../styles/imageButtonUniform.module.css';
import ImageFrame from '../../src/images/UniformFrame.png';
import { FileInput } from 'react-image-file-resizer';

const ImageButtonUniform = ({ label }) => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div className={styles.imageButtonContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.imageButtonWrapper}>
        <div onClick={handleImageClick} style={{ cursor: 'pointer' }}>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className={styles.imgdisplayafter}
            />
          ) : (
            <img src={ImageFrame} className={styles.imgdisplaybefore} />
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

export default ImageButtonUniform;
