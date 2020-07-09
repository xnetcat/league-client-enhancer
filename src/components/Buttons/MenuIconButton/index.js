import React from "react";
import { MenuSurface, MenuSurfaceAnchor } from "@rmwc/menu";
import { IconButton } from "@rmwc/icon-button";

function MenuIconButton(props) {
  const [open, setOpen] = React.useState(false);

  console.log(props);

  return (
    <MenuSurfaceAnchor>
      <MenuSurface open={open} onClose={(evt) => setOpen(false)}>
        {props.items.map((item) => (
          <div style={{ padding: "1rem", width: "8rem" }}>{item}</div>
        ))}
      </MenuSurface>
      <IconButton icon={props.icon} onClick={(evt) => setOpen(!open)} />
    </MenuSurfaceAnchor>
  );
}

export default MenuIconButton;
