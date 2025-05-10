import { DateRange } from "../../../utils/date/dateRangeFilter";
import BaseSelect from "../../common/BaseSelect";

interface PeriodOption {
  value: DateRange;
  label: string;
}

interface Props {
  period: DateRange;
  setPeriod: (value: DateRange) => void;
}

const PeriodSelect = ({ period, setPeriod }: Props) => {
  const options: PeriodOption[] = [
    { value: "1week", label: "최근 1주" },
    { value: "1month", label: "최근 1개월" },
    { value: "1year", label: "최근 1년" },
  ];

  return <BaseSelect value={period} onChange={setPeriod} options={options} />;
};

export default PeriodSelect;
