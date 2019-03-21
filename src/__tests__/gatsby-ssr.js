
import React from "react";
import { setPragma, extractCss } from "goober";
import { onRenderBody } from "../gatsby-ssr"

jest.mock("goober", () => ({
  extractCss: jest.fn().mockReturnValue("goober-css"),
  setPragma: jest.fn()
}));

describe(`gatsby-plugin-goober`, () => {

  it("should call setPragma", () => {
    expect(setPragma).toHaveBeenCalledWith(React.createElement);
  })

  describe(`onRenderBody`, () => {

    beforeEach(() => {
      extractCss.mockClear();
    });

    it(`sets the correct head components`, () => {
      const setHeadComponents = jest.fn();
      const pathname = "/";

      onRenderBody({ setHeadComponents, pathname });

      expect(extractCss).toBeCalled();

      expect(setHeadComponents).toHaveBeenCalledTimes(1)
      expect(setHeadComponents).toHaveBeenCalledWith([
        <style
          data-goober={true}
          key="data-goober"
          dangerouslySetInnerHTML={{ __html: 'goober-css' }}
        />
      ]);
    });

    it(`cached`, () => {
      const setHeadComponents = jest.fn();
      const pathname = "/";

      onRenderBody({ setHeadComponents, pathname });

      expect(extractCss).not.toBeCalled();

      expect(setHeadComponents).toHaveBeenCalledTimes(1)
      expect(setHeadComponents).toHaveBeenCalledWith([
        <style
          data-goober={true}
          key="data-goober"
          dangerouslySetInnerHTML={{ __html: 'goober-css' }}
        />
      ]);
    })
  })
})
