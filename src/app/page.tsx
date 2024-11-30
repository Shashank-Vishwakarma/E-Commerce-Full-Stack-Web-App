"use client"

import Modal from "@/components/modal/modal";

export default function Home() {
  return (
    <p className="">
      <Modal title="test" description="test" isOpen={true} onClose={() => {}} />
    </p>
  );
}
