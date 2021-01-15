import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Loader } from "rsuite";

import Crawler from "./Crawler";
import CrawlerList from "./CrawlerList";
import NoCrawler from "./NoCrawler";
import CrawlingModal from "../components/crawler/Crawling.modal";

import "./Dashboard.scss";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [crawlerList, setCrawlerList] = useState([]);

  const selectedCrawler = useMemo(() => {
    return crawlerList.find((crawler) => crawler.id === selectedId);
  }, [selectedId, crawlerList]);

  useEffect(() => {
    const retriveCrawlerList = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/crawler");
        if (response.status === 200) setCrawlerList(response.data);
        else console.error(response.statusText);
      } catch (error) {
        console.log("frontend error", error);
      } finally {
        setLoading(false);
      }
    };

    retriveCrawlerList();
  }, []);

  const addNewCrawler = async (newName) => {
    if (newName.length <= 0 || loading) return;
    setLoading(true);
    try {
      const newCrawler = await axios.post("http://localhost:8000/crawler", {
        name: newName,
        date: new Date().toDateString(),
      });
      const newCrawlerList = [newCrawler.data, ...crawlerList];
      setCrawlerList(newCrawlerList);
      setSelectedId(newCrawler.data.id);
    } catch (error) {
      console.log("frontend error", error);
    } finally {
      setLoading(false);
    }
  };

  const saveCrawler = async (payload) => {
    if (loading) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/updatecrawler", {
        id: selectedId,
        crawler: payload,
      });
      setCrawlerList((crawlerList) =>
        crawlerList.map((crawler) =>
          crawler.id !== selectedId ? crawler : { ...crawler, ...payload }
        )
      );
    } catch (error) {
      console.log("frontend error", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCrawler = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/deletecrawler", {
        id,
      });
      setSelectedId("");
      setCrawlerList((crawlerList) =>
        crawlerList.filter((crawler) => crawler.id !== id)
      );
    } catch (error) {
      console.log("frontend error", error);
    } finally {
      setLoading(false);
    }
  };

  const startCrawl = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/crawl", { id });
    } catch (error) {
      console.log("frontend error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      {loading ? (
        <>
          <Loader
            style={{ zIndex: 999 }}
            inverse
            backdrop
            content="loading..."
            vertical
          />
          <div className="loading-backdrop"></div>
        </>
      ) : null}
      <CrawlingModal show={false} />
      <CrawlerList
        crawlerList={crawlerList}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onDelete={deleteCrawler}
      />
      {selectedId === "" ? (
        <NoCrawler onAddNewCrawler={addNewCrawler} />
      ) : (
        <Crawler
          key={selectedId}
          crawler={selectedCrawler}
          onSave={saveCrawler}
          onStartCrawl={startCrawl}
        />
      )}
    </div>
  );
};

export default Dashboard;
