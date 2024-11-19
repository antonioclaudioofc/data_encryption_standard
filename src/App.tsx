import React, { useState } from "react";
import { DES } from "./class/des.class";

export default function App() {
  const [formData, setFormData] = useState({ textClear: "", key: "" });
  const [result, setResult] = useState<{
    textBinary: number[];
    encrypted: number[];
    decrypted: number[];
  } | null>(null);

  const textToBinaryArray = (textClear: string) => {
    return Array.from(new TextEncoder().encode(textClear)).flatMap((byte) =>
      byte.toString(2).padStart(8, "0").split("").map(Number)
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const block = textToBinaryArray(formData.textClear);
    console.log(block);
    const key = textToBinaryArray(formData.key);

    const des = new DES(key);
    const encryptedBinary = des.encrypt(block);
    const decryptedBinary = des.decrypt(encryptedBinary);

    setResult({
      textBinary: block,
      encrypted: encryptedBinary,
      decrypted: decryptedBinary,
    });
  };

  return (
    <>
      <header className="w-full bg-blue-500 py-6">
        <h1 className="text-3xl text-white text-center">
          Data Encryption Standard
        </h1>
      </header>

      <form className="text-center" onSubmit={onSubmit}>
        <div className="grid gap-6 my-6 w-max mx-auto">
          <div>
            <label
              htmlFor="textClear"
              className="block mb-2 text-xl font-medium text-gray-900"
            >
              Texto Claro
            </label>
            <input
              type="text"
              id="textClear"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-center outline-none block w-80 p-3 focus:border-blue-500"
              placeholder="Insira o texto claro"
              value={formData.textClear}
              maxLength={8}
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="key"
              className="block mb-2 text-xl font-medium text-gray-900"
            >
              Chave
            </label>
            <input
              type="text"
              id="key"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-center outline-none block w-80 p-3 focus:border-blue-500"
              placeholder="Insira a palavra chave"
              value={formData.key}
              maxLength={8}
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-bold rounded-lg w-full sm:w-auto px-5 py-3 text-center"
        >
          Gerar DES
        </button>
      </form>

      {result && (
        <div className="mt-10">
          <div className="max-w-7xl  mx-auto text-center">
            <h2 className="text-2xl font-bold">Resultados</h2>
            <p className="text-gray-600">
              <strong>Texto em Binário:</strong> {result.textBinary}
            </p>
            <p className="text-gray-600">
              <strong>Criptografado:</strong> {result.encrypted}
            </p>
            <p className="text-gray-600">
              <strong>Descriptografado:</strong> {result.decrypted}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
