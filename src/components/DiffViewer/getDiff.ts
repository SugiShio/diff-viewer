export const getDiff = (before: string, after: string) => {
  const beforeLines = before ? before.split("\n") : [];
  const afterLines = after ? after.split("\n") : [];
  const resultBefore = [];
  const resultAfter = [];

  let indexBefore = 0;
  while (beforeLines.length && indexBefore < beforeLines.length) {
    const beforeLine = beforeLines[indexBefore];
    const indexAfter = afterLines.indexOf(beforeLine);
    if (indexAfter > -1) {
      const offset = Math.max(indexBefore, indexAfter);
      for (let i = 0; i < offset; i++) {
        resultAfter.push(i < indexAfter ? { type: "changed", text: afterLines.shift() } : { type: "empty" });
        resultBefore.push(i < indexBefore ? { type: "changed", text: beforeLines.shift() } : { type: "empty" });
      }
      resultAfter.push({ type: "unchanged", text: afterLines.shift() });
      resultBefore.push({ type: "unchanged", text: beforeLines.shift() });
      indexBefore = 0;
    } else {
      indexBefore++;
    }
  }
  beforeLines.forEach((line) => {
    resultBefore.push({ type: "changed", text: line });
  });
  afterLines.forEach((line) => {
    resultAfter.push({ type: "changed", text: line });
  });
  return {
    before: resultBefore,
    after: resultAfter,
  };
};
