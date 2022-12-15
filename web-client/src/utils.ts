import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const groupBy = (arr: Object[], key: string): { [key: string]: [] } => arr.reduce((group: any, obj: any) => {
  const keyVal = obj[key];
  group[keyVal] = group[keyVal] ?? [];
  group[keyVal].push(obj);
  return group;
}, {});

export const useQuery = (): URLSearchParams => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

export const getTitleFontSizeClass = (size: string): string => {
  switch (size) {
    case 'small':
      return 'text-base';
    case 'normal':
      return 'text-2xl';
    case 'large':
      return 'text-4xl';
    case 'xlarge':
      return 'text-6xl';
    default:
      return 'text-2xl';
  }
};

export const getBodyFontSizeClass = (size: string): string => {
  switch (size) {
    case 'small':
      return 'text-xs';
    case 'normal':
      return 'text-base';
    case 'large':
      return 'text-2xl';
    case 'xlarge':
      return 'text-4xl';
    default:
      return 'text-base';
  }
};
