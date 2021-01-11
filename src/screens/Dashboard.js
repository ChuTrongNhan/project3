import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Loader } from "rsuite";

import Crawler from "./Crawler";
import CrawlerList from "./CrawlerList";
import NoCrawler from "./NoCrawler";

import "./Dashboard.scss";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
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
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    retriveCrawlerList();
  }, []);

  const addNewCrawler = async (newName) => {
    if (newName.length <= 0) return;
    setLoading(true);
    try {
      const newCrawler = await axios.post("http://localhost:8000/crawler", {
        name: newName,
        date: new Date().toDateString(),
      });
      const newCrawlerList = [newCrawler.data, ...crawlerList];
      setCrawlerList(newCrawlerList);
      setSelectedId(newCrawler.data.id);
      setLoading(false);
    } catch (error) {
      console.log("frontend error", error);
      setLoading(false);
    }
  };

  const selectCrawler = (i) => {
    setSelectedId(i);
  };

  const saveCrawler = async (payload) => {
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
      setLoading(false);
    } catch (error) {
      console.log("frontend error", error);
      setLoading(false);
    }
  };

  const deleteCrawler = async (id) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/deletecrawler", {
        id: id,
      });
      setSelectedId(-1);
      setCrawlerList((crawlerList) =>
        crawlerList.filter((crawler) => crawler.id !== id)
      );
      setLoading(false);
    } catch (error) {
      console.log("frontend error", error);
      setLoading(false);
    }
  };

  /*
  const list = ["abc", "test"];

  // set up local state for generating the download link
  const [downloadLink, setDownloadLink] = useState("");

  // function for generating file and set download link
  const makeTextFile = () => {
    // This creates the file.
    // In my case, I have an array, and each item in
    // the array should be on a new line, which is why
    // I use .join('\n') here.
    const data = new Blob([list.join("\n")], { type: "text/plain" });

    // this part avoids memory leaks
    if (downloadLink !== "") window.URL.revokeObjectURL(downloadLink);

    // update the download link state
    setDownloadLink(window.URL.createObjectURL(data));
  };

  // Call the function if list changes
  useEffect(() => {
    makeTextFile();
  }, [list]);
*/
  // class MyApp extends React.Component {
  //   downloadTxtFile = () => {
  //     const element = document.createElement("a");
  //     const file = new Blob([document.getElementById('input').value],
  //                 {type: 'text/plain;charset=utf-8'});
  //     element.href = URL.createObjectURL(file);
  //     element.download = "myFile.txt";
  //     document.body.appendChild(element);
  //     element.click();
  //   }
  //   render() {
  //     return (
  //      <div>
  //        <input id="input" />
  //        <button onClick={this.downloadTxtFile}>Download</button>
  //       </div>
  //     );
  //    }
  //  }

  return (
    <div className="dashboard">
      {loading ? <Loader backdrop content="loading..." vertical /> : null}
      <CrawlerList
        crawlerList={crawlerList}
        selectedId={selectedId}
        onSelect={selectCrawler}
        onDelete={deleteCrawler}
      />
      {/* <a
        // this attribute sets the filename
        download="list.txt"
        // link to the download URL
        href={downloadLink}
      >
        download
      </a> */}
      {selectedId === -1 ? (
        <NoCrawler onAddNewCrawler={addNewCrawler} />
      ) : (
        <Crawler
          key={selectedId}
          crawler={selectedCrawler}
          onSave={saveCrawler}
        />
      )}
    </div>
  );
};

export default Dashboard;
