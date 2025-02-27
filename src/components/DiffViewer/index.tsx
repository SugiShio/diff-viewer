import "./style.scss";
type Line =
  | {
      type: "changed" | "unchanged";
      text: string;
    }
  | {
      type: "empty";
    };

export const DiffViewer = () => {
  const before: Line[] = [
    { type: "unchanged", text: "111" },
    { type: "changed", text: "111<span>bbb</span>" },
    { type: "changed", text: "111bbb" },
    { type: "unchanged", text: "Hello, world!" },
  ];
  const after: Line[] = [
    { type: "unchanged", text: "111" },
    { type: "changed", text: "111<span>aaa</span>" },
    { type: "empty" },
    { type: "unchanged", text: "Hello, world!" },
  ];

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
