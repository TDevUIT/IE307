export const convertStringToObject = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error('Failed to parse data:', e);
    return {}; // or handle the error as needed
  }
};
