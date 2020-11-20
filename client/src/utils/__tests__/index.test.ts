import { moveElement } from '../index';

it('should move an element to another position in array', () => {
  const array = ['a', 'b', 'c', 'd'];

  moveElement(array, 1, 0);
  expect(array).toEqual(['b', 'a', 'c', 'd']);

  moveElement(array, 2, 1);
  expect(array).toEqual(['b', 'c', 'a', 'd']);

  moveElement(array, 0, 0);
  expect(array).toEqual(['b', 'c', 'a', 'd']);

  moveElement(array, 0, 3);
  expect(array).toEqual(['c', 'a', 'd', 'b']);
});
