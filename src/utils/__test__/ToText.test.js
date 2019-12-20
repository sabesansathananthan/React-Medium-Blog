import ToText from '../ToText';

it('check whether ToText function is working or not', () => {
  const a = '<div><p>This is a mock test for this function</p></div>';
  const b = 'This is a mock test for this function';
  const c = ToText(a);
  console.log('jjjjjjjjjjjjjjjj', c);
  // expect(ToText(a)).toBe(b);
});
