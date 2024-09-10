import { formatDistanceToNow, parseISO } from 'date-fns';

export const convertFileToUrl = (file) => {
    if (!file || !(file instanceof Blob)) {
      throw new Error('Invalid file object');
    }
  
    return URL.createObjectURL(file);
};

export const TimeAgo = ({ dateString }) => {
  const date = parseISO(dateString);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return <span>{timeAgo}</span>;
}