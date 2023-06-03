import { Contributor } from './components/Attribution/Attribution';

export const basemap: {
  url: string;
  contributors: Contributor[];
} = {
  // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
  url: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
  contributors: [
    {
      url: 'https://www.openstreetmap.org/copyright',
      name: 'OpenStreetMap',
      suffix: ' contributors',
    },
  ],
};

export const japanBBox = [122.94, 24.06, 146.16, 45.52];
