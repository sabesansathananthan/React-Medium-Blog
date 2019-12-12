import ToText from '../ToText';

it('check whether ToText function is working or not', () => {
  const a = '<div>This is a mock test for this function</div>';
  const b = 'This is a mock test for this function';

  // console.log(ToText(a));
  expect(ToText(a)).toBe(b);
});
