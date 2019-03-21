jest.mock(`goober`)

import React from "react"
import goober from "goober"
import { onRenderBody } from "../gatsby-ssr"

describe(`gatsby-plugin-goober`, () => {
  describe(`onRenderBody`, () => {
    it(`sets the correct head components`, () => {
      goober.extractCSS = jest.fn(() => `goober-css`)
      const setHeadComponents = jest.fn()

      onRenderBody({ setHeadComponents })

      expect(setHeadComponents).toHaveBeenCalledTimes(1)
      expect(setHeadComponents).toHaveBeenCalledWith([
        <style
          id="goober-ids"
          key="goober-ids"
          dangerouslySetInnerHTML={{ __html: `goober-css` }}
        />,
      ])
    })
  })
})
