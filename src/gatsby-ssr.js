import { extractCss } from "goober"

exports.onRenderBody = ({ setHeadComponents }) => {
  const css = extractCss()
  setHeadComponents([
    <style
      id="goober-ids"
      key="goober-ids"
      dangerouslySetInnerHTML={{ __html: css }}
		/>,
  ])
}
