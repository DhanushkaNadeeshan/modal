"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useModal = (isShow: boolean) => {
  const isInitialRender = useRef(true);
  const [visible, setVisible] = useState(false);
  const [animationCSS, setAnimationCSS] = useState("scale-up-ver-center");

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (isShow) {
      setVisible(true);
      setAnimationCSS("scale-up-ver-center");
    } else {
      setAnimationCSS("scale-out-vertical");
      const timer = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timer); // Clean up the timeout on unmount or if isShow changes before the timeout completes
    }
  }, [isShow]);

  return { visible, animationCSS };
};

interface ModalProps {
  isShow: boolean;
  children: React.ReactNode;
}

type ModalSubComponents = {
  Title: typeof Title;
  Body: typeof Body;
  Footer: typeof Footer;
};
// Main
const Modal: React.FC<ModalProps> & ModalSubComponents = ({
  isShow,
  children,
}) => {
  const { visible, animationCSS } = useModal(isShow);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className="fixed backdrop-blur-sm flex-col top-0 w-screen h-screen flex justify-center items-center">
      <div
        className={`w-3/4 md:w-1/2 bg-[#CAF4FF] p-4 rounded-lg shadow opacity-100 ${animationCSS}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className="border-b border-sky-500">
      <p className="text-sm  text-blue-800">{children}</p>
    </div>
  );
};

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <div className="p-2">{children}</div>;
};

interface FooterProps {
  children: React.ReactNode;
  customeCSS?: string; 
}

const Footer: React.FC<FooterProps> = ({ children ,customeCSS }) => {
  return <div className={`mt-2 w-full ${customeCSS}`}>{children}</div>;
};
// React subcomponents
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
