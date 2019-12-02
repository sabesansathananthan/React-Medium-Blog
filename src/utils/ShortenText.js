export default function ShortenText(text, startingPoint, maxLength) {
  return text.length > maxLength
    ? text.slice(startingPoint, maxLength)
    : text;
}