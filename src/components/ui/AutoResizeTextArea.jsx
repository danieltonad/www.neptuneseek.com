import { useRef, useEffect } from "react";

const AutoResizeTextarea = (props) => {
  const textareaRef = useRef(null);

  const resize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    resize();
    textarea?.addEventListener("input", resize);
    return () => textarea?.removeEventListener("input", resize);
  }, []);

  useEffect(() => {
    resize();
  }, [props.value]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    props.onKeyDown?.(e);
  };

  return <textarea ref={textareaRef} {...props} onKeyDown={handleKeyDown} />;
};

export default AutoResizeTextarea;
