/* eslint-disable @typescript-eslint/no-unused-vars */
export function checkResponseTypeData(data: string): boolean {
  try {
    const parsedData = JSON.parse(data);
    if (
      typeof parsedData.turn === 'number' &&
      typeof parsedData.question === 'string' &&
      (parsedData.answer === null || typeof parsedData.answer === 'string')
    ) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
