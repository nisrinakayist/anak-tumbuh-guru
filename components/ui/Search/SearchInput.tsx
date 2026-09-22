import { InputHTMLAttributes } from "react";
import { CiSearch } from "react-icons/ci";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

function SearchInput({ ...rest }: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <CiSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-900/40" />
      <input
        type="text"
        className="w-full rounded-xl border border-primary-100 bg-white py-2.5 pl-9 pr-4 text-xs font-semibold text-primary-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20"
        {...rest}
      />
    </div>
  );
}

export default SearchInput;
