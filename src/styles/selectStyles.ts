export const baseSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    fontSize: "0.875rem", // text-sm
    backgroundColor: "#fff",
    padding: "0.3rem 0.5rem",
    boxShadow: state.isFocused ? "0 0 0 1px #8b5cf6" : "none",
    fontWeight: "bold",
  }),
  menu: (base: any) => ({
    ...base,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
    fontSize: "0.8rem",
    zIndex: 20,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? "#793DF9" : state.isFocused ? "#EEE6FE" : "#fff",
    color: state.isSelected ? "#fff" : "#000",
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    fontWeight: "bold",
  }),
  indicatorSeparator: () => ({ display: "none" }), // | 제거
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: "0 0.25rem",
    color: "#9ca3af", // gray-400
    "&:hover": {
      color: "#6b7280", // gray-500
    },
  }),
};
