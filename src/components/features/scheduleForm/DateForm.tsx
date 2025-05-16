import DatePicker from "react-datepicker";

interface DateFormProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function DateForm({ selectedDate, setSelectedDate }: DateFormProps) {
  return (
    <div className="my-4">
      <label className="block mb-1 font-bold">날짜 및 시간</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => date && setSelectedDate(date)}
        showTimeSelect
        timeIntervals={30} // 시간 선택 간격 (30분 단위)
        dateFormat="yyyy.MM.dd (eee) HH:mm" // 원하는 포맷
        className="w-full text-sm p-2 border rounded bg-white focus:outline-none focus:ring-1 focus:ring-primary"
        wrapperClassName="w-full"
      />
    </div>
  );
}
