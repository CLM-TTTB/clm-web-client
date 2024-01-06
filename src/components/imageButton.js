import { useRef, useState } from 'react';
import styles from '../styles/imageButton.module.css';
import ImageFrame from '../../src/images/ImageFrame.png';
import { FileInput } from 'react-image-file-resizer';

const ImageButton = ({ label }) => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  // const handleImageChange = (event) => {
  //   const maxWidth = 196;
  //   const maxHeight = 196;

  //   FileInput.prototype.handleFile = (file) => {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       const imageUrl = e.target.result;

  //       FileInput.prototype.handleFile = (file) => {
  //         return new Promise((resolve) => {
  //           resizeFile(file, maxWidth, maxHeight, (resizedImage) => {
  //             resolve(resizedImage);
  //           });
  //         });
  //       };

  //       console.log(imageUrl);
  //     };

  //     reader.readAsDataURL(file);
  //   };

  //   const resizeFile = (file, maxWidth, maxHeight, callback) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = (event) => {
  //       const img = new Image();
  //       img.src = event.target.result;

  //       img.onload = () => {
  //         const canvas = document.createElement('canvas');
  //         const ctx = canvas.getContext('2d');

  //         let width = img.width;
  //         let height = img.height;

  //         if (width > height) {
  //           if (width > maxWidth) {
  //             height *= maxWidth / width;
  //             width = maxWidth;
  //           }
  //         } else {
  //           if (height > maxHeight) {
  //             width *= maxHeight / height;
  //             height = maxHeight;
  //           }
  //         }

  //         canvas.width = width;
  //         canvas.height = height;

  //         ctx.drawImage(img, 0, 0, width, height);

  //         canvas.toBlob((blob) => {
  //           callback(new File([blob], file.name, { type: file.type }));
  //         }, file.type);
  //       };
  //     }
  //   }

  //   return (
  //     <div>
  //       <FileInput
  //         muilple={false}
  //         customInput={(props) => (
  //           <input type='file' onChange={(e) => handleImageChange(e.target.files[0])} />
  //         )}
  //       />
  //     </div>
  //   )
  // };

  //REALLY NEED TO FIX THIS BUT I DONT KNOW
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
