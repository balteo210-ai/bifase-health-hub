import { Link } from 'react-router-dom';
import bifaseLogo from '@/assets/bifase-logo.png';

interface BifaseLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  linkTo?: string;
}

const sizeMap = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-16',
};

const BifaseLogo = ({ className = '', size = 'md', linkTo = '/' }: BifaseLogoProps) => {
  const img = <img src={bifaseLogo} alt="Bifase" className={`${sizeMap[size]} w-auto object-contain ${className}`} />;
  if (linkTo) return <Link to={linkTo}>{img}</Link>;
  return img;
};

export default BifaseLogo;
