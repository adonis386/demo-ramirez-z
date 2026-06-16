import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type IconColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AppIconProps {
  icon: IconDefinition;
  size?: IconSize;
  color?: IconColor;
  className?: string;
}

const sizePx: Record<IconSize, number> = {
  xs: 13,
  sm: 15,
  md: 18,
  lg: 22,
  xl: 28,
};

export function AppIcon({ icon, size = 'md', color = 'primary', className = '' }: AppIconProps) {
  const px = sizePx[size];

  return (
    <FontAwesomeIcon
      icon={icon}
      className={`fa-icon fa-icon--${color} ${className}`.trim()}
      style={{ width: px, height: px }}
    />
  );
}
