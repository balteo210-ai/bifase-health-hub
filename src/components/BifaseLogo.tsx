import { Link } from 'react-router-dom';
import bifaseLogo from '@/assets/bifase-logo.png';

interface BifaseLogoProps {
  className?: string;
  size?: 'navbar' | 'sm' | 'md' | 'lg';
  linkTo?: string;
}

const sizeMap = {
  navbar: 'h-10',
  sm: 'h-14',
  md: 'h-20',
  lg: 'h-32',
};

const BifaseLogo = ({ className = '', size = 'md', linkTo = '/' }: BifaseLogoProps) => {
  const img = <img src={bifaseLogo} alt="Bifase" className={`${sizeMap[size]} w-auto object-contain ${className}`} />;
  if (linkTo) return <Link to={linkTo}>{img}</Link>;
  return img;
};

export default BifaseLogo;
