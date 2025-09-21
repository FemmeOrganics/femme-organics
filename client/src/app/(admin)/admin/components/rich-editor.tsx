import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const RichTextEditor = ({value, setValue}: {value: string, setValue: (value: string) => void}) => {

  return (
    <ReactQuill theme="snow" value={value} onChange={setValue} />
  );
};

