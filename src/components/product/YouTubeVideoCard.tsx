'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export interface YouTubeVideoCardProps {
  videoSrc: string;
  className?: string;
  gradientClass?: string;
}

export const YouTubeVideoCard: FC<YouTubeVideoCardProps> = ({
  videoSrc,
  className = '',
  gradientClass = 'bg-gradient-to-t from-black/90 to-transparent',
}) => {
  const [videoError, setVideoError] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Process video URL to handle YouTube links
  useEffect(() => {
    if (videoSrc) {
      // Check if it's a YouTube URL
      if (videoSrc.includes('youtu.be') || videoSrc.includes('youtube.com')) {
        // Extract video ID
        let videoId = '';
        
        if (videoSrc.includes('youtu.be/')) {
          // Format: https://youtu.be/VIDEO_ID
          videoId = videoSrc.split('youtu.be/')[1];
          if (videoId.includes('?')) {
            videoId = videoId.split('?')[0];
          }
        } else if (videoSrc.includes('youtube.com/watch')) {
          // Format: https://www.youtube.com/watch?v=VIDEO_ID
          const urlParams = new URLSearchParams(videoSrc.split('?')[1]);
          videoId = urlParams.get('v') || '';
        }
        
        if (videoId) {
          // Create embed URL with parameters for better viewing experience
          setEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`);
          // Set thumbnail URL (high quality)
          setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
        } else {
          setVideoError(true);
        }
      } else {
        // It's a direct video URL
        setEmbedUrl(videoSrc);
        setVideoError(true); // We can't get thumbnail for non-YouTube videos
      }
    }
  }, [videoSrc]);

  const handleVideoError = () => {
    setVideoError(true);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div 
          className={`rounded-2xl aspect-video lg:aspect-video overflow-hidden shadow-lg relative cursor-pointer ${className}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          onClick={() => embedUrl && !videoError && setIsOpen(true)}
        >
          {/* Background Image - YouTube Thumbnail */}
          <div className="absolute inset-0 w-full h-full bg-slate-800 ">
            {thumbnailUrl && (
              <div 
                className="w-full h-full bg-cover bg-no-repeat bg-center "
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
              />
            )}
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {embedUrl && !videoError && (
              <div className="lg:w-24 lg:h-24 w-16 h-16 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
                <div className="w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-l-[25px] border-l-white ml-2"></div>
              </div>
            )}
          </div>

          {/* Gradient Overlay at bottom */}
          <div className={`absolute bottom-0 left-0 right-0 h-2/3 ${gradientClass} z-5`}></div>

          {/* Content */}
          <div className="relative flex flex-col items-center justify-end text-center h-full z-10 px-2 pb-4 pt-20">
            {videoError && (
              <p className="text-xs mt-2 text-white/60 italic">
                Video unavailable
              </p>
            )}
          </div>
        </motion.div>
      </DialogTrigger>

      {/* Video Dialog */}
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] max-h-[90vh] lg:max-w-[1000px] p-0 bg-black border-none">
        {embedUrl && (
          <div className="relative">
            <DialogClose className="absolute -top-10 right-0 rounded-full w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-sm text-white z-50 hover:bg-white/40 transition-colors">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
            
            <iframe
              src={embedUrl}
              className="w-full h-[80vh] md:aspect-video md:h-auto"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              onError={handleVideoError}
            ></iframe>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}; 