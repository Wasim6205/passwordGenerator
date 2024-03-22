import React, { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const PasswordGenerator = () => {
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = () => {
    let pass = "";
    let str = "";
    if (uppercase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) str += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (symbols) str += "@#$%&*/{}[]";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  };

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 15);
    window.navigator.clipboard.writeText(password);
  };
  useEffect(() => {
    generatePassword();
  }, [uppercase, lowercase, numbers, symbols]);

  return (
    <div className="flex flex-col gap-4 px-2">
      <h2 className="text-center text-gray-400 font-medium">
        Password Generator
      </h2>
      <div className="flex relative">
        <input
          readOnly
          ref={passwordRef}
          type="text"
          className=" font-medium bg-slate-800 text-xl text-white outline-none w-full py-1 px-3"
          value={password}
        />
        <button
          className="absolute right-2 bottom-2 text-light-green"
          onClick={copyPasswordToClipboard}
        >
          <FaCopy />
        </button>
      </div>
      <div className="flex flex-col gap-4 bg-slate-800 p-4 min-w-screen w-[350px]">
        <div className="flex justify-between items-center">
          <p className="font-medium">Character Length</p>
          <span className="text-2xl text-light-green">{length}</span>
        </div>
        <input
          type="range"
          min={6}
          max={15}
          className="cursor-pointer"
          onChange={(e) => setLength(e.target.value)}
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-x-4">
            <input
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={uppercase}
              id="uppercase"
              onChange={() => setUppercase((prev) => !prev)}
            />
            <label htmlFor="uppercase">Include Uppercase Letters</label>
          </div>
          <div className="flex gap-x-4">
            <input
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={lowercase}
              id="lowercase"
              onChange={() => setLowercase((prev) => !prev)}
            />
            <label htmlFor="lowercase">Include Lowercase Letters</label>
          </div>
          <div className="flex gap-x-4">
            <input
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={numbers}
              id="numbers"
              onChange={() => setNumbers((prev) => !prev)}
            />
            <label htmlFor="numbers">Include Numbers</label>
          </div>
          <div className="flex gap-x-4">
            <input
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={symbols}
              id="symbols"
              onChange={() => setSymbols((prev) => !prev)}
            />
            <label htmlFor="symbols">Include Symbols</label>
          </div>
        </div>
        <button
          onClick={() => generatePassword()}
          className="bg-blue-500 py-2 text-black flex justify-center items-center gap-4 font-medium"
        >
          GENERATE <FaArrowRight fontSize={15} />
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
