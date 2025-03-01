export const getLineDiff = (before: string, after: string) => {
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

  for (let index = 0; index < resultBefore.length; index++) {
    if (resultBefore[index].type === "changed" && resultAfter[index]?.type === "changed") {
      const { textBefore, textAfter } = getTextDiff(resultBefore[index].text || "", resultAfter[index].text || "");
      resultBefore[index].text = textBefore;
      resultAfter[index].text = textAfter;
    }
  }
  return {
    before: resultBefore,
    after: resultAfter,
  };
};

const getTextDiff = (before: string, after: string) => {
  const beforeChars = before ? before.split("") : [];
  const afterChars = after ? after.split("") : [];
  const resultBefore = [];
  const resultAfter = [];

  let indexBefore = 0;
  while (beforeChars.length && indexBefore < beforeChars.length) {
    const beforeChar = beforeChars[indexBefore];
    const indexAfter = afterChars.indexOf(beforeChar);
    if (indexAfter > -1) {
      if (indexBefore > 0) {
        const diffBefore = beforeChars.splice(0, indexBefore);
        resultBefore.push(wrapTextWithTag(diffBefore.join("")));
      }
      if (indexAfter > 0) {
        const diffAfter = afterChars.splice(0, indexAfter);
        resultAfter.push(wrapTextWithTag(diffAfter.join("")));
      }

      resultAfter.push(beforeChars.shift());
      resultBefore.push(afterChars.shift());
      indexBefore = 0;
    } else {
      indexBefore++;
    }
  }
  resultBefore.push(wrapTextWithTag(beforeChars.join("")));
  resultAfter.push(wrapTextWithTag(afterChars.join("")));

  return { textBefore: resultBefore.join(""), textAfter: resultAfter.join("") };
};

const wrapTextWithTag = (text: string, tag = "span") => {
  return `<${tag}>${text}</${tag}>`;
};
