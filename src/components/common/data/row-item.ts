/**
 * Replaces only spaces with subsequent capital letters
 * @param str e.g. 'camel case'
 * @returns camelCase
 */
export function spacedToCamelCase(str: string) {
  const words = str.split(' ');
  return words[0] + words
    .slice(1)  
    .map((w) => w[0]?.toUpperCase() + w.slice(1)?.toLowerCase())
    .join('').replace(/[^a-zA-Z0-9]/g, ''); // remove special characters
}

export function toCamelKeys(obj: object) {
  const newObj = {};
  for (const key in obj) {
      const newKey = spacedToCamelCase(key);
      newObj[newKey] = obj[key];
  }
  return newObj;
}

export function toUiAmount(num: number) {
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}
