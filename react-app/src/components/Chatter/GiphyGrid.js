import React from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

const GiphyGrid = ({ apiKey }) => {
  const gf = new GiphyFetch(apiKey);
  const fetchGifs = (offset) => gf.trending({ offset, limit: 10 });

  return <Grid width={800} columns={3} fetchGifs={fetchGifs} />;
};

export default GiphyGrid;
