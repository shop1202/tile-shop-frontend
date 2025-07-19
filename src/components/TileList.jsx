import { useEffect, useState } from 'react';
import api from '../api/api'; // adjust path if needed

const TileList = () => {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    api.get('/tiles') // Replace '/tiles' with your real endpoint
      .then((res) => setTiles(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tile Inventory</h2>
      <ul>
        {tiles.map(tile => (
          <li key={tile._id}>{tile.name} - {tile.stock}</li>
        ))}
      </ul>
    </div>
  );
};

export default TileList;
