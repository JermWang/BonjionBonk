'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageSelectorGridProps {
  folder: 'heads' | 'things' | 'main' | 'base';
  selectedImageUrl: string | null;
  onImageSelect: (url: string) => void;
  gridCols?: string;
}

const VALID_FOLDERS = ['heads', 'things', 'main', 'base'];

export default function ImageSelectorGrid({
  folder,
  selectedImageUrl,
  onImageSelect,
  gridCols = 'grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'
}: ImageSelectorGridProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    // Validate folder before making API call
    if (!VALID_FOLDERS.includes(folder)) {
      console.error(`Invalid folder: ${folder}. Must be one of: ${VALID_FOLDERS.join(', ')}`);
      setImageUrls([]);
      return;
    }

    const loadImages = async () => {
      try {
        console.log(`Fetching images for ${folder}...`);
        const response = await fetch(`/api/assets?folder=${folder}`);
        
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }
        
        const files = await response.json();
        console.log('API response:', files);
        
        const urls = files.map((file: string) => `/images/characters/${folder}/${file}`);
        console.log('Generated URLs:', urls);
        
        setImageUrls(urls);
      } catch (error) {
        console.error(`Error loading images from ${folder}:`, error);
        setImageUrls([]);
      }
    };

    loadImages();
    const interval = setInterval(loadImages, 5000);
    return () => clearInterval(interval);
  }, [folder]);

  if (!imageUrls || imageUrls.length === 0) {
    return <p className="text-sm text-gray-500 p-4 text-center">No items to display.</p>;
  }

  return (
    <div className="overflow-y-auto h-96">
      <div className={`grid ${gridCols} gap-3 p-1`}>
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
            fill
            className="object-contain transition-transform duration-150 ease-in-out" 
          />
          {selectedImageUrl === url && (
            <div className="absolute inset-0 ring-1 ring-inset ring-brand-blue/50 pointer-events-none" />
          )}
        </button>
      ))}
      </div>
    </div>
  );
} 