"use client";
import { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

export default function Home() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  return (
    <main className="p-4">
      <Button onClick={() => setIsShowModal(true)}>Show Modal</Button>

      <Modal isShow={isShowModal}>
        <Modal.Title>Message</Modal.Title>
        <Modal.Body>
          <p>Hello World! 🌏❤️</p>
        </Modal.Body>
        <Modal.Footer customeCSS="flex justify-end">
          <Button onClick={() => setIsShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
