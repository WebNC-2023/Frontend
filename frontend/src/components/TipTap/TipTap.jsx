import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as React from "react";
import Underline from "@tiptap/extension-underline";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "./TipTap.css";
import Placeholder from "@tiptap/extension-placeholder";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div style={{ paddingTop: "16px" }}>
      <Tooltip title="Đậm">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          style={
            editor.isActive("bold")
              ? {
                  color: "#1d1d1d",
                  backgroundColor: "#e0e0e0",
                  minWidth: "0px",
                }
              : {
                  color: "#5f6368",
                  minWidth: "0px",
                }
          }
        >
          <FormatBoldIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Nghiêng">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          style={
            editor.isActive("italic")
              ? {
                  color: "#1d1d1d",
                  backgroundColor: "#e0e0e0",
                  minWidth: "0px",
                }
              : {
                  color: "#5f6368",
                  minWidth: "0px",
                }
          }
        >
          <FormatItalicIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Gạch chân">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
          style={
            editor.isActive("underline")
              ? {
                  color: "#1d1d1d",
                  backgroundColor: "#e0e0e0",
                  minWidth: "0px",
                }
              : {
                  color: "#5f6368",
                  minWidth: "0px",
                }
          }
        >
          <FormatUnderlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Danh sách có dấu đầu dòng">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          style={
            editor.isActive("bulletList")
              ? {
                  color: "#1d1d1d",
                  backgroundColor: "#e0e0e0",
                  minWidth: "0px",
                }
              : {
                  color: "#5f6368",
                  minWidth: "0px",
                }
          }
        >
          <FormatListBulletedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

const TipTap = ({content, setContentMsg, placeholderTipTap, tipTapFocus }) => {
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: placeholderTipTap,
      }),
    ],
    autofocus: tipTapFocus,
    content,
    onUpdate: ({ editor }) => {
      const data = editor.getHTML();
      setContentMsg(data);
    },
  
  });
  React.useEffect(()=>{
    if (content === "") {
      editor?.commands?.clearContent();
    }
  }, [content])
  return (
    <div className="TipTap-container">
      <EditorContent spellCheck="false" autoComplete="off" editor={editor} />
      <MenuBar editor={editor} />
    </div>
  );
};
export default TipTap;
