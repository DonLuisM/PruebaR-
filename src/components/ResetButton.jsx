function ResetButton({ onClick }) {
  return (
    <button
      className="mt-6 rounded-lg border border-[#F9C5D5] bg-[#FCE7F3] px-6 py-2 text-[#C9184A] font-semibold hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
      onClick={onClick}
    >
      Reiniciar
    </button>
  );
}

export default ResetButton;
