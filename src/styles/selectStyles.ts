export const baseSelectStyles = {
  control: (base: any) => ({
    ...base,
    fontSize: "0.875rem", // text-sm
    backgroundColor: "#fff",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  }),
  menu: (base: any) => ({
    ...base,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
    fontSize: "0.875rem",
    zIndex: 20,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#eab308" // yellow-400
      : "#fff",
    color: "#000",
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
  }),
  indicatorSeparator: () => ({ display: "none" }), // | 제거
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: "0 0.25rem",
    color: "#9ca3af", // gray-400
  }),
};
