"use client";
import { collection, getDocs } from "firebase/firestore";
import "./style.scss";
import { useEffect, useState } from "react";
import { db } from "~/plugins/firebase";
import { Button } from "~/components/Button";
import { DiffViewer } from "~/components/DiffViewer";
const SAMPLE_BEFORE =
  "あのイーハトーヴォのすきとおった風、\n夏でも底に冷たさをもつ青いそら、\nうつくしい森で飾られたモリーオ市、\n郊外のぎらぎらひかる草の波。\nまたそのなかでいっしょになったたくさんのひとたち、\nファゼーロとロザーロ、羊飼のミーロや、\n顔の赤いこどもたち、地主のテーモ、\n山猫博士のボーガント・デストゥパーゴなど、\nいまこの暗い巨きな石の建物のなかで考えていると、\nみんなむかし風のなつかしい青い幻燈のように思われます。";
const SAMPLE_AFTER =
  "あのイ一ハトーヴォのすきとおった風、\n夏でも底に冷たさをもつ青いそら、\n美しい森で飾られたモリーオ市、\n郊外のギラギラひかる草の波。\nまたそのなかでいっしょになったたくさんのひとたち、\nファゼーロとロザーロ, 羊飼のミーロや、\n顔の紅い子供たち、地主のテーモ、\n山猫博士のボーガント・デストゥパーゴなど、\nいまこの暗い巨きな石の建物のなかで考えていると、\nみんなむかし風のナツカシイ青い幻燈のように思われます。";
export default function Home() {
  const [beforeText, setBeforeText] = useState(SAMPLE_BEFORE);
  const [afterText, setAfterText] = useState(SAMPLE_AFTER);
  const [news, setNews] = useState({} as { title: string; createdAt: string });
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const snapshot = await getDocs(collection(db, "articles"));
        const articles = snapshot.docs.map((doc) => {
          return doc.data();
        });
        const { title, createdAt } = articles[0];
        setNews({ title, createdAt: createdAt.toDate().toLocaleString() });
      } catch (error) {
        console.error("Error fetching news: ", error);
      }
    };
    fetchNews();
  }, []);

  const handleBeforeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBeforeText(e.target.value);
  };
  const handleAfterText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAfterText(e.target.value);
  };

  return (
    <div className="p-index">
      {news && (
        <section className="p-index__news">
          <h2 className="p-index__news-title">News</h2>
          <div className="p-index__news-item">
            {news.createdAt} {news.title}
          </div>
        </section>
      )}
      <div className="p-index__textarea-wrapper">
        <textarea className="p-index__textarea" onChange={handleBeforeText} defaultValue={SAMPLE_BEFORE} />
        <textarea className="p-index__textarea" onChange={handleAfterText} defaultValue={SAMPLE_AFTER} />
      </div>
      <div className="p-index__button-wrapper">
        <Button text="差分を確認"></Button>
      </div>
      {(beforeText || afterText) && <DiffViewer beforeText={beforeText} afterText={afterText} />}
    </div>
  );
}
