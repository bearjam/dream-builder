import React from "react"
import { Tab, TabList, TabPanel, Tabs as ReactTabs } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import { useCanvasStore } from "stores/canvas"
import { insertCanvasTextItemAction } from "stores/canvas/actions"
import TextForm from "../TextForm"
import PhotoBin from "./PhotoBin"
import css from "./index.module.css"

const AssetTools = () => {
  const dispatch = useCanvasStore((store) => store.dispatch)

  return (
    <div className={css.assetTools}>
      <ReactTabs>
        <TabList>
          <Tab>Images</Tab>
          <Tab>Text</Tab>
        </TabList>
        <TabPanel>
          <PhotoBin />
        </TabPanel>
        <TabPanel>
          <TextForm
            onSubmit={(text) => dispatch(insertCanvasTextItemAction({ text }))}
          />
        </TabPanel>
      </ReactTabs>
    </div>
  )
}

export default AssetTools
