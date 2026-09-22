"use client";

type SidebarRoleCardProps = {
  roleLabel: string;
};

export default function SidebarRoleCard({ roleLabel }: SidebarRoleCardProps) {
  return (
    <div className="mx-4 mt-5 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/60">Peran Akun</p>
      <p className="mt-1 text-sm font-extrabold text-white">{roleLabel}</p>
    </div>
  );
}
