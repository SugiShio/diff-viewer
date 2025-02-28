import "./style.scss";
import { getDiff } from "./getDiff";
type Line =
  | {
      type: "changed" | "unchanged";
      text: string;
    }
  | {
      type: "empty";
    };

export const DiffViewer = ({ beforeText, afterText }: { beforeText: string; afterText: string }) => {
  const { before, after } = getDiff(beforeText, afterText);

  const line = (lines: Line[]) => {
    return lines.map((line, index) => {
      return (
        <div key={index} className={`c-diff-viewer__line ${line.type}`}>
          {line.type !== "empty" && (
            <>
              <span className="c-diff-viewer__line-num"></span>
              <span className="c-diff-viewer__mark"></span>
              <code className="c-diff-viewer__line-text" dangerouslySetInnerHTML={{ __html: line.text }}></code>
            </>
          )}
        </div>
      );
    });
  };
  return (
    <div className="c-diff-viewer">
      <div className="c-diff-viewer__before">
        <div className="c-diff-viewer__filename">before.txt</div>
        <div className="c-diff-viewer__content">{line(before)}</div>
      </div>
      <div className="c-diff-viewer__after">
        <div className="c-diff-viewer__filename">after.txt</div>
        <div className="c-diff-viewer__content">{line(after)}</div>
      </div>
    </div>
  );
};
