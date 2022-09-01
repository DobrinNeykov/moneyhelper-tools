import Content from "../components/Content";

const H1 = ({ children }) => {
  return (
    <h1
      className="py-8 text-4xl text-blue-800 font-bold mb-8"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #f3f1f3 16.67%, #ffffff 16.67%, #ffffff 50%, #f3f1f3 50%, #f3f1f3 66.67%, #ffffff 66.67%, #ffffff 100%)",
        backgroundSize: " 8.49px 8.49px",
      }}
    >
      <Content>{children}</Content>
    </h1>
  );
};

export default H1;
