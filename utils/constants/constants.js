export const labelsStar = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.25: 'Average',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export const getLabelText = (value) => `${value} Star${value !== 1 ? 's' : ''}, ${labelsStar[value]}`;

export const options = [
    'product',
    'webdevelopment',
    'idea',
    'ai',
    'machinelearning',
    'deeplearning',
    'datascience',
    'python',
    'javascript',
    'react'
];