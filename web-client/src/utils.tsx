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

export const isAccessTokenValid = (jwt: string): boolean => {
  if (!jwt) {
    return false;
  }
  const jwtBodyRaw = jwt.split('.')[1];
  if (!jwtBodyRaw) {
    return false;
  }
  try {
    const jwtBodyStr = window.atob(jwtBodyRaw);
    const jwtBody = JSON.parse(jwtBodyStr);
    const expire = jwtBody.exp;
    if (!Number.isInteger(expire) || expire * 1000 < new Date().getTime()) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

export const CLIENT_MEDIA_PREFIX = '$UTTICUS_MEDIA$';

export const MEDIA_IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];

export const MEDIA_VIDEO_EXT = ['.mp4'];

export const getFileType = (fileName: string): string => {
  const fileExt = fileName.substring(fileName.lastIndexOf('.'));
  if (MEDIA_IMAGE_EXT.includes(fileExt)) {
    return 'image';
  }
  if (MEDIA_VIDEO_EXT.includes(fileExt)) {
    return 'video';
  }
  return 'unknown';
};

export const parseFileTags = (content: string): JSX.Element => {
  const contentParts = content.split('$');
  const fileNames = contentParts[2];
  const widths = contentParts[3];
  const fileNameSplit = fileNames.split(',');
  const widthSplit = widths.split(',');
  const contents = fileNameSplit.map((fileName, idx) => {
    const fileType = getFileType(fileName);
    const widthClass = `${(widthSplit[idx] ? `w-${widthSplit[idx]}` : '')} self-center`;
    if (fileType === 'image') {
      return <img src={`/file_uploads/public/${fileName}`} className={widthClass} key={`img-${idx}`} />;
    }
    if (fileType === 'video') {
      return <video className={widthClass} key={`video-${idx}`} controls muted autoPlay loop>
        <source src={`/file_uploads/public/${fileName}`} type="video/mp4" />
      </video>;
    }
    return <></>;
  });
  return <div className='flex flex-row flex-wrap justify-evenly'>
    {contents}
  </div>;
};
