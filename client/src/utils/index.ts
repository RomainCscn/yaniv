export const cacheImages = async (imageArray: string[]) => {
  const promises = await imageArray.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  });

  await Promise.all(promises);
};

export const moveElement = (array: any[], fromIndex: number, toIndex: number) => {
  const element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
};
