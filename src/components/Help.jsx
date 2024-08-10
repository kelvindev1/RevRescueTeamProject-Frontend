import React, { useEffect, useState } from "react";

function Help() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5555/help")
      .then((response) => response.text())
      .then((html) => {
        setContent(html);
      })
      .catch((error) => {
        console.error("Error fetching the help content:", error);
      });
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      style={{ margin: "20px" }}
    />
  );
}

export default Help;
