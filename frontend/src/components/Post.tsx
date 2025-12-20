import IconButton from '@/components/IconButton';
import LikeButton from '@/features/posts/components/LikeButton';
import KebabMenu from '@/components/KebabMenu';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface images {
  imagePath: string;
  alt: string;
}

interface PostProps {
  icon: ReactNode;
  userName: string;
  userId: string;
  postId: string;
  text: string;
  images: images;
  isLiked: boolean;
  className?: string;
}

const Post = ({icon, userName, userId, text, images, isLiked, className=""}: PostProps) => {
  
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate(`/home/profile/${userId}/report`); 
  }

  const handleProfileClick = () => {
    navigate(`/home/profile/${userId}`); 
  }


  return (
    <div className={`${className} flex w-full px-2`}>
      <IconButton
      onClick={() => {handleProfileClick()}}
      ButtonIcon={icon}
      className="w-12 h-12 flex-none"
      />
      <div className= "mx-2 flex-1 min-w-0">
        <div className= "flex items-center justify-between">
          <p className="truncate">
          {userName}
          </p>
          <div className="flex items-center">
            <LikeButton
              isLiked={isLiked}
              onClick={() => {}}
              className="w-12 h-12"
            />
            <KebabMenu
              items={[{ label: '通報する', onClick: () => {handleReportClick()} , itemsClassName: "text-error"}]}
              className="h-12 w-12 ml-2"
            />
          </div>
        </div>
        <div>
          <p className="break-word">{text}</p>
          <div>
            <img 
            src={images.imagePath} 
            alt={images.alt} 
            className="mt-2 max-h-100 w-full  border border-foreground/80 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Post;