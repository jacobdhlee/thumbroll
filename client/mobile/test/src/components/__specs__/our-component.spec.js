import React from "react";
import { shallow } from "enzyme";

import OurComponent from "../our-component";

describe("<OurComponent/>", () => {
  it('should exist', () => {
    expect(OurComponent).to.exist;
  });
});
