export const base64ToBlobHelper = (base64Data: string): Blob => {
  const [metadata, base64String] = (base64Data || '').split(';base64,');

  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], {type: metadata.split(':')[1]});
};
