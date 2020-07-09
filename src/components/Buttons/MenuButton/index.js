import React from "react";
import { Menu, MenuItem, MenuSurfaceAnchor } from "@rmwc/menu";
import { Button } from "@rmwc/button";

function MenuButton(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <MenuSurfaceAnchor>
      <Menu open={open} onClose={(evt) => setOpen(false)}>
        {props.items.map((item) => (
          <MenuItem>{item}</MenuItem>
        ))}
      </Menu>

      <Button raised onClick={(evt) => setOpen(!open)}>
        {props.title}
      </Button>
    </MenuSurfaceAnchor>
  );
}

export default MenuButton;
