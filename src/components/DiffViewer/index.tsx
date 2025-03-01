import "./style.scss";
import { getLineDiff } from "./getDiff";
import { Line } from "./getDiff";

export const DiffViewer = ({ beforeText, afterText }: { beforeText: string; afterText: string }) => {
  const { before, after } = getLineDiff(beforeText, afterText);

  const line = (beforeLines: Line[], afterLines: Line[]) => {
    const length = Math.max(beforeLines.length, afterLines.length);
    const result = new Array(length).fill(null);
    return result.map((_, index) => {
      return (
        <div className="c-diff-viewer__row" key={index}>
          <div className={`c-diff-viewer__before ${beforeLines[index]?.type}`}>
            {beforeLines[index] && beforeLines[index]?.type !== "empty" && (
              <>
                <span className="c-diff-viewer__line-num"></span>
                <span className="c-diff-viewer__mark"></span>
                <code
                  className="c-diff-viewer__line-text"
                  dangerouslySetInnerHTML={{ __html: beforeLines[index]?.text }}
                ></code>
              </>
            )}
          </div>
          <div className={`c-diff-viewer__after ${afterLines[index]?.type}`}>
            {afterLines[index] && afterLines[index]?.type !== "empty" && (
              <>
                <span className="c-diff-viewer__line-num"></span>
                <span className="c-diff-viewer__mark"></span>
                <code
                  className="c-diff-viewer__line-text"
                  dangerouslySetInnerHTML={{ __html: afterLines[index]?.text }}
                ></code>
              </>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="c-diff-viewer">
      {/* <div className="c-diff-viewer__row">
        <div className="c-diff-viewer__filename">before</div>
        <div className="c-diff-viewer__filename">after</div>
      </div> */}
      {line(before, after)}
    </div>
  );
};
