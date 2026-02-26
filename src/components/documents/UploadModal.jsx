import { useRef, useState } from "react";

function UploadCloudIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  );
}

export default function UploadModal({ onClose }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleFileChange(e) {
    setFile(e.target.files[0] || null);
  }

  return (
    <>
      {/* Backdrop - clicking outside closes modal */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Modal panel - positioned top-right near the upload button */}
      <div
        className="fixed top-[60px] right-4 z-50 w-full max-w-[360px] bg-white rounded-2xl shadow-2xl border border-[#0F11141A] p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <p className="text-base font-bold text-[#0F1114]">Upload files</p>
        <p className="text-xs font-medium text-[#0F111499] mt-0.5 mb-4">
          Add images and documents.
        </p>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed border-[#004CE580] rounded-xl px-5 py-7 flex flex-col items-center gap-3 transition-colors ${
            dragging ? " bg-blue-50" : " bg-[#FAFAFA]"
          }`}
        >
          <div className="text-center">
            <p className="text-sm font-bold text-[#0F1114]">Drop files here</p>
            <p className="text-xs text-[#0F111499] font-medium mt-0.5">
              or choose from your computer
            </p>
          </div>

          {/* Choose File */}
          <div className="flex justify-center items-center gap-3 bg-[#FAFAFA] px-4 py-3 rounded-lg border border-[#0F11141A]">
            <label className="flex items-center gap-2 px-4 py-2.5 bg-[#0F1114] rounded-full cursor-pointer hover:opacity-90 transition">
              <FileIcon />
              <span className="text-xs font-extrabold text-white uppercase tracking-wide">
                Choose File
              </span>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,.zip"
              />
            </label>

            {file ? (
              <p className="text-xs text-[#0F1114] font-semibold truncate max-w-full">
                {file.name}
              </p>
            ) : (
              <p className="text-xs text-[#0F111466] font-medium">
                No file chosen
              </p>
            )}
          </div>
        </div>

        {/* Add button */}
        <button
          disabled={!file}
          className="mt-4 w-full py-4 bg-gradient-to-r from-[#004CE5] to-[#3388FF] rounded-full text-sm font-extrabold text-white uppercase tracking-wide hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ADD
        </button>
      </div>
    </>
  );
}
