import React from "react";
import { extractCss, setPragma } from "goober";

// goober specific api, to be able to render react element
setPragma(React.createElement);

// Keeps the css cached
const cache = new Map();

exports.onRenderBody = ({ setHeadComponents, pathname }) => {

  // Add cache support for short-circuiting the processing part
  if (!cache.has(pathname)) {
    cache.set(pathname, extractCss());
  }

  setHeadComponents([
    <style
      data-goober
      key="data-goober"
      dangerouslySetInnerHTML={{ __html: cache.get(pathname) }}
    />
  ])
}
