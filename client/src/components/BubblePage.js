import React, { useState, useEffect } from 'react';
import bubbleGet from '../services/bubbleGet';
import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    bubbleGet().then(res => setColorList(res.data));
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
