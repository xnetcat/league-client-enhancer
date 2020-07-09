// Imports
import React, { useState } from "react";
// Ui imports
import { CardActionButton, CardActions, CardPrimaryAction } from "@rmwc/card";
import { Typography } from "@rmwc/typography";
import { CollapsibleList } from "@rmwc/list";

function PluginPrimaryActions(props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <CardPrimaryAction>
      <div
        style={{
          padding: "0 1rem 1rem 1rem",
        }}
      >
        <Typography use="headline6" tag="h2">
          {props.plugin.name}
        </Typography>
        <Typography
          use="subtitle2"
          tag="h3"
          theme="textSecondaryOnBackground"
          style={{
            marginTop: "-1rem",
          }}
        >
          by {props.plugin.author}
        </Typography>
        <Typography use="body1" tag="div" theme="textSecondaryOnBackground">
          {props.plugin.shortDescription}
        </Typography>
      </div>
      <CardActions fullBleed>
        <CollapsibleList
          onClick={() => setExpanded(true)}
          handle={
            <CardActionButton
              style={{ paddingRight: "1.5rem" }}
              label="Show description"
              trailingIcon="arrow_downward"
            />
          }
        >
          {expanded && (
            <Typography
              style={{
                padding: "1rem 1rem 1rem 1rem",
              }}
              use="body1"
              tag="div"
              theme="textSecondaryOnBackground"
            >
              {props.plugin.longDescription}
            </Typography>
          )}
        </CollapsibleList>
      </CardActions>
    </CardPrimaryAction>
  );
}

export default PluginPrimaryActions;
