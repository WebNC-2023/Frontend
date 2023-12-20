import "./CreateExercise.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
const CreateExercise = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <div className="createExercise-container">
        <div className="createExercise-flex">
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            style={{
              borderRadius: "30px",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "500",
            }}
            variant="contained"
            startIcon={
              <AddIcon
                style={{
                  fontSize: "1.75rem",
                }}
              />
            }
            onClick={handleToggle}
          >
            Tạo
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            style={{ paddingTop: "10px" }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        onClick={handleClose}
                        style={{
                          columnGap: "35px",
                          paddingTop: "8px",
                          paddingBottom: "16px",
                        }}
                      >
                        <AssignmentOutlinedIcon
                          style={{
                            color: "#1863ca",
                          }}
                        />
                        Bài tập
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        style={{
                          columnGap: "35px",
                          paddingTop: "8px",
                          paddingBottom: "16px",
                        }}
                      >
                        <AssignmentOutlinedIcon
                          style={{
                            color: "#1863ca",
                          }}
                        />
                        Bài kiểm tra
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        style={{
                          columnGap: "35px",
                          paddingTop: "8px",
                          paddingBottom: "16px",
                        }}
                      >
                        <LiveHelpOutlinedIcon
                          style={{
                            color: "#1863ca",
                          }}
                        />
                        Câu hỏi
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        style={{
                          columnGap: "35px",
                          paddingTop: "8px",
                          paddingBottom: "16px",
                        }}
                      >
                        <ClassOutlinedIcon
                          style={{
                            color: "#1863ca",
                          }}
                        />
                        Tài liệu
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        style={{
                          columnGap: "35px",
                          paddingTop: "8px",
                          paddingBottom: "16px",
                          borderBottom: "1px solid #e0e0e0",
                          marginBottom: "8px",
                        }}
                      >
                        <RepeatOutlinedIcon
                          style={{
                            color: "#1863ca",
                          }}
                        />
                        Sử dụng lại bài đăng
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        style={{
                          columnGap: "35px",
                          paddingTop: "8px",
                          paddingBottom: "16px",
                          marginTop: "8px",
                        }}
                      >
                        <ViewListOutlinedIcon
                          style={{
                            color: "#1863ca",
                          }}
                        />
                        Chủ đề
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </>
  );
};

export default CreateExercise;
