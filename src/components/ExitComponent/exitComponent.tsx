import { useState } from 'react';
import catDefault from '@/assets/confusedcat.png';
import catHappy from '@/assets/happycat.png';
import catSad from '@/assets/sadCat.png';

const ExitModal = () => {
  const [hoveredButton, setHoveredButton] = useState<'yes' | 'no' | null>(null);

  let currentCatImage = catDefault;
  let mainText = 'برنج خیس کردم کجا میخوای بری؟';
  let subText = 'آیا میخواهید خارج شوید؟';

  if (hoveredButton === 'no') {
    currentCatImage = catHappy;
    mainText = '! هورااا';
  } else if (hoveredButton === 'yes') {
    currentCatImage = catSad;
    mainText = '! نرو فاطمه';
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center font-bold">
      <img
        src={currentCatImage}
        alt="گربه"
        className="w-32 h-32 mx-auto mb-4 object-contain"
      />

      <p className="text-xl mb-2">{mainText}</p>
      <p className="text-lg mb-6">{subText}</p>

      <div className="flex gap-4 justify-center">
        <button
          onMouseEnter={() => setHoveredButton('yes')}
          onMouseLeave={() => setHoveredButton(null)}
          className={`w-40 py-3 rounded-lg transition-transform duration-200 ${
            hoveredButton === 'yes' ? 'translate-y-[-4px]' : ''
          } bg-gray-300 text-black font-bold`}
        >
          بله
        </button>

        <button
          onMouseEnter={() => setHoveredButton('no')}
          onMouseLeave={() => setHoveredButton(null)}
          className={`w-40 py-3 rounded-lg transition-transform duration-200 ${
            hoveredButton === 'no' ? 'translate-y-[-4px]' : ''
          } bg-cyan-400 text-black font-bold`}
        >
          خیر
        </button>
      </div>
    </div>
  );
};

export default ExitModal;