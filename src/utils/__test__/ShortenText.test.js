import ShortenText from '../ShortenText';

it('check whether ShortenText function is working or not', () => {
  const a = 'This is a mock test for this function.';
  const b = 'This is a mock test';

  expect(ShortenText(a, 0, 19)).toBe(b);
});
