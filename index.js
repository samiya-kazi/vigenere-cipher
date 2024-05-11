const plaintext = "Hello I am the plaintext";
const key = "turkey";

function createKeyedTemplate (key) {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const rearranged = [];
  let spliced = [...alphabet];
  const keyChar = key.toLowerCase().split('');

  for (const char of keyChar) {
    if (!rearranged.includes(char)) {
      const index = spliced.indexOf(char);
      rearranged.push(char);
      spliced.splice(index, 1);
    }
  }

  const row = [...rearranged, ...spliced];

  const template = [[...row]];

  for (let i= 0; i< 25; i++) {
    const latestRow = [...template[template.length - 1]];
    const shifted = [...latestRow.slice(1), latestRow[0]];
    template.push(shifted);
  }

  return template;
}

const key2 = "hidden";

function generateCypher (plaintext, key, key2) {
  const template = createKeyedTemplate(key);
  const chars = plaintext.replace(/[^a-zA-Z]/g, '').toLowerCase();

  let result = "";

  function getCharFromTemplate (char1, char2) {
    const index1 = template[0].indexOf(char1);
    const index2 = template[0].indexOf(char2);
    return template[index1][index2];
  }

  for (let i = 0; i < chars.length; i++) {
    const keyCharIndex = i % key2.length;
    const char1 = chars[i];
    const char2 = key2[keyCharIndex];

    const newChar = getCharFromTemplate(char1, char2);

    result += newChar;
  }

  console.log(result);
  return result;
}

generateCypher(plaintext, key, key2);