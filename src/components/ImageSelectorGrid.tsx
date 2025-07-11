'use client';

import Image from 'next/image';

interface ImageSelectorGridProps {
  imageUrls: string[];
  selectedImageUrl: string | null;
  onImageSelect: (url: string) => void;
  gridCols?: string; // e.g., 'grid-cols-3' or 'grid-cols-4'
}

export default function ImageSelectorGrid({
  imageUrls,
  selectedImageUrl,
  onImageSelect,
  gridCols = 'grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3' // Default responsive columns
}: ImageSelectorGridProps) {
  if (!imageUrls || imageUrls.length === 0) {
    return <p className="text-sm text-gray-500 p-4 text-center">No items to display.</p>;
  }

  return (
    <div className={`grid ${gridCols} gap-3 p-1`}> {/* Adjusted gap and padding */}
      {imageUrls.map((url) => (
        <button
          key={url}
          onClick={() => onImageSelect(url)}
          className={`relative aspect-square rounded-lg overflow-hidden focus:outline-none transition-all duration-150 ease-in-out 
                      bg-gray-50 p-2 group hover:scale-105 shadow hover:shadow-md 
                      ${selectedImageUrl === url 
                        ? 'border-2 border-brand-blue shadow-lg scale-105' 
                        : 'border border-gray-300 hover:border-brand-blue'}`}
          aria-pressed={selectedImageUrl === url}
          title={`Select ${url.split('/').pop()?.split('.')[0] || 'item'}`}
        >
          <Image
            src={url}
            alt={url.split('/').pop()?.split('.')[0] || 'Selectable item'}
            layout="fill"
            objectFit="contain" // Contain will ensure the whole image is visible within the button's padded area
            className="transition-transform duration-150 ease-in-out" 
          />
          {selectedImageUrl === url && (
            <div className="absolute inset-0 ring-1 ring-inset ring-brand-blue/50 pointer-events-none">
              {/* Optional: Checkmark icon for selected state if border isn't enough */}
              {/* <svg className="absolute top-1 right-1 w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> */}
            </div>
          )}
        </button>
      ))}
    </div>
  );
} 