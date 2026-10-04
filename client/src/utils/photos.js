import lab from '../assets/photos/lab.jpg';
import coat from '../assets/photos/coat.jpg';
import childhood from '../assets/photos/childhood.jpg';
import water from '../assets/photos/water.jpg';
import cinema from '../assets/photos/cinema.jpg';

// Alt text only describes what is visible. Nothing here is a claim about his life.
export const PHOTOS = {
  lab: { src: lab, width: 960, height: 1280, alt: 'Muzammil, smiling in his white coat and making a peace sign in a laboratory' },
  coat: { src: coat, width: 960, height: 1280, alt: 'Muzammil standing outdoors in his white coat, remembered by his friends and family' },
  childhood: { src: childhood, width: 900, height: 1368, alt: 'Muzammil as a young child, smiling with a toy phone held to his ear' },
  water: { src: water, width: 1280, height: 853, alt: 'Muzammil smiling and pointing upwards while standing in the water' },
  cinema: { src: cinema, width: 1000, height: 1333, alt: 'Muzammil in a green jacket, leaning against a pillar and smiling' },
};

export const GALLERY = [PHOTOS.lab, PHOTOS.coat, PHOTOS.childhood, PHOTOS.water, PHOTOS.cinema];
