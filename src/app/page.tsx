"use client";
import "./style.scss";
import { useState } from "react";
import { Button } from "~/components/Button";
import { DiffViewer } from "~/components/DiffViewer";

export default function Home() {
  const [beforeText, setBeforeText] = useState("");
  const [afterText, setAfterText] = useState("");
  const handleBeforeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBeforeText(e.target.value);
  };
  const handleAfterText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAfterText(e.target.value);
  };

  return (
    <div className="p-index">
      <div className="p-index__textarea-wrapper">
        <textarea className="p-index__textarea" name="" id="" onChange={handleBeforeText}></textarea>
        <textarea className="p-index__textarea" name="" id="" onChange={handleAfterText}></textarea>
      </div>
      <div className="p-index__button-wrapper">
        <Button text="差分を確認"></Button>
      </div>
      {(beforeText || afterText) && <DiffViewer beforeText={beforeText} afterText={afterText} />}
    </div>
  );
}
