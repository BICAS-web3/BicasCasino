import { FC, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

interface SettingsAvatarProps {
  currentAvatarUrl: string;
  onAvatarChange: (newAvatarUrl: string) => void;
}

export const SettingsAvatar: FC<SettingsAvatarProps> = ({ currentAvatarUrl, onAvatarChange }) => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input change event:", e);
    const file = e.target.files?.[0];
    console.log("Selected file:", file);
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        const newUrl = URL.createObjectURL(file);
        console.log("New avatar URL:", newUrl);
        setIsUploading(false);
        setNewAvatarUrl(newUrl);
        onAvatarChange(newUrl);
      }, 2000);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById('avatarInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className='border border-[#3E3E3E] rounded-md relative p-4'>
      <div className='flex flex-col items-center mt-12'>
        {newAvatarUrl ? (
          <img src={newAvatarUrl} alt='New Avatar' className='rounded-full w-24 h-24 mb-4' />
        ) : (
          <div className='rounded-full w-24 h-24 mb-4 flex items-center justify-center bg-gray-300'>
            <div className='w-16 h-16 rounded-full'></div>
          </div>
        )}
        <p className="text-xs text-gray-400 mb-1" >{t('pages.settings.Profile.jpgOrPng')}</p>
        <p className="text-xs text-gray-400 mb-4" >{t('pages.settings.Profile.maxSize')}</p>
        <div className="w-full border-t border-[#3E3E3E] mb-20 mt-12"></div>
        <button
          onClick={handleClick}
          className='bg-[#252019] border-2 border-[#907640] hover:bg-[#3E3E3E] text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out absolute bottom-4 right-4 w-180 h-30'
        >
          {isUploading ? (
            <div className='flex items-center'>
              <AiOutlineLoading className='mr-2 animate-spin' />
              {t('modals.Profile.load')}
            </div>
          ) : (
            t('Profile.select')
          )}
        </button>
        <input
          id='avatarInput'
          type='file'
          accept='image/*'
          onChange={handleAvatarChange}
          className='hidden'
        />
      </div>
    </div>
  );
};
