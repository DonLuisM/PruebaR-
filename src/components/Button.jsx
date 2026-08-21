import GradientText from "./Gradient.jsx";

function Button({ onClick }) {
  return (
    <button
      className="relative flex h-[20%] w-[80%] items-center justify-center overflow-hidden rounded-lg border border-[#F9C5D5] bg-[#FCE7F3] cursor-pointer sm:w-[65%] md:w-[30%] hover:-translate-y-2 transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      <GradientText
        colors={["#5590D2", "#C9184A", "#FF758F"]}
        animationSpeed={4.5}
        showBorder={false}
        className="custom-class text-2xl"
      >
        Hay algo que quería decirte...
      </GradientText>
    </button>
  );
}

export default Button;
