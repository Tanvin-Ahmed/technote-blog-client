export const textToHtml = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.textContent;
};
