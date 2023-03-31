import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useState,useEffect } from 'react';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function RichEditor({ id, name, value, onChange }) {
  const [content, setContent] = useState(value);

  const handleContentChange = (content, delta, source, editor) => {
    setContent(content);
    onChange(content);
  };

  // update content state when the value prop changes
  useEffect(() => {
    setContent(value);
  }, [value]);

  return (
    <QuillNoSSRWrapper
      className="h-full "
      name={name}
      theme="snow"
      id={id}
      value={content}
      onChange={handleContentChange}
      required
    />
  );
}
