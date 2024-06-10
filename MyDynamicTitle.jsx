import { useEffect } from 'react';

const MyDynamicTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default MyDynamicTitle;