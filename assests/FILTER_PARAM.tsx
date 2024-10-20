export const FILTER_PARAMS = [
  {
    Brand: ['Infra Market', 'Ultra Tech', 'Bharathi', 'ACC', 'Sagar'],
    Grade: ['OPC 33', 'UOPC 43', 'OPC 53'],
    Weight: ['20 Kg', '30 Kg', '40 Kg', '50 Kg'],
    Price: ['Under 200', 'Under 300', 'Under 400', 'Under 500', 'Under 600'],
    Rating: ['1 ⭐️', '2 ⭐️', '3 ⭐️', '4 ⭐️', '5 ⭐️'],
  },
];

type FilterHeadingsType = 'Brand' | 'Grade' | 'Weight' | 'Price' | 'Rating';

export const FilterHeadings: FilterHeadingsType[] = [
  'Brand',
  'Grade',
  'Weight',
  'Price',
  'Rating',
];
