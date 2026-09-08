"use client";

import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addStudent, resetAddStudentStatus } from "@/redux/features/students/studentSlice";
import { fetchClassroomDashboard } from "@/redux/features/classroom/classroomSlice";
import TextInput from "@/components/ui/Input/TextInput";
import SelectInput from "@/components/ui/Input/SelectInput";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

function AddStudentForm() {
  const [name, setName] = useState("");
  const [nis, setNis] = useState("");
  const [gender, setGender] = useState<"L" | "P">("L");

  const dispatch = useDispatch<AppDispatch>();
  const { addLoading, addError, addSuccessMessage } = useSelector(
    (state: RootState) => state.student
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    dispatch(resetAddStudentStatus());

    const result = await dispatch(addStudent({ name, nis, gender }));

    if (addStudent.fulfilled.match(result) && result.payload.code === 200) {
      setName("");
      setNis("");
      setGender("L");
      dispatch(fetchClassroomDashboard());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Nama Lengkap"
        name="name"
        type="text"
        placeholder="Nama lengkap siswa"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <TextInput
        label="NISN / NIS"
        name="nis"
        type="text"
        placeholder="Nomor induk siswa"
        required
        value={nis}
        onChange={(event) => setNis(event.target.value)}
      />

      <SelectInput
        label="Jenis Kelamin"
        name="gender"
        value={gender}
        onChange={(event) => setGender(event.target.value as "L" | "P")}
        options={[
          { label: "Laki-laki", value: "L" },
          { label: "Perempuan", value: "P" },
        ]}
      />

      {addError && <ErrorAlert message={addError} onClose={() => dispatch(resetAddStudentStatus())} />}
      {addSuccessMessage && (
        <p className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
          {addSuccessMessage}
        </p>
      )}

      <PrimaryButton isLoading={addLoading}>Tambah Siswa</PrimaryButton>
    </form>
  );
}

export default AddStudentForm;
