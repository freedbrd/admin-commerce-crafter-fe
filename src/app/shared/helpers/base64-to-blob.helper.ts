export const base64ToBlobHelper = (base64Data: string): Blob => {
  const [metadata, base64String] = (base64Data || '').split(';base64,');

  if (!isDataImage(base64Data)) {
    return null;
  }

  if(!base64String) {
    return null;
  }

  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], {type: metadata.split(':')[1]});
};

const isDataImage = (base64Data: string): boolean => {
  return /^data:image\/(jpeg|jpg|png|gif|svg\+xml);base64,/.test(base64Data);
};
