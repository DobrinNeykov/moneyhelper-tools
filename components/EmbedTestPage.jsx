const EmbedTestPage = ({ src }) => {
  return (
    <div className="container mx-auto p-10 space-y-4">
      <div className="text-4xl border rounded p-3 text-gray-700 font-bold">
        Test Partner Site
      </div>
      <div className="border p-3">
        <div
          className="w-full"
          style={{
            overflow: "hidden",
            "padding-top": "66.66%",
            position: "relative",
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "100%",
              left: 0,
              position: "absolute",
              top: 0,
            }}
            src={src}
            loading="lazy"
          />
        </div>
      </div>
      <div className="text-4xl mb-10 border rounded p-3 text-gray-700 font-bold">
        Copyright © Test Partner Site {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default EmbedTestPage;
