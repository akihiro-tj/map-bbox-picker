export type Action = {
  type: string;
  payload: any;
};

export type BBox = {
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
};
