import React from "react"
import ReactDOM from "react-dom"
import ListItem from "../ListItem"

describe("<ListItem />", () => {
  it("should render <ListItem />", () => {
    const div = document.createElement("div")
    const wrapper = ReactDOM.render(
      <ListItem
        issue={{
          id: "issueID",
          title: "Issue title",
          bodyText:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
          createdAt: "2018-05-19T09:07:23Z",
          author: {
            url: "url",
            avatarUrl: "avatarUrl"
          }
        }}
      />,
      div
    )
    expect(wrapper).toMatchSnapshot()
  })
})
