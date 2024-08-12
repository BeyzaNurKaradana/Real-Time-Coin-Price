

import React from "react";

interface ModalProps {
  /**
   * Determines if the modal is open or closed.
   * @type {boolean}
   */
  isOpen: boolean;

  /**
   * Function to call when the modal needs to be closed.
   * @function
   * @returns {void}
   */
  onClose: () => void;
}

/**
 * A modal component used to display important information or messages.
 * @component
 * @param {ModalProps} props - The properties to configure the modal.
 * @returns {JSX.Element | null} The rendered modal component, or null if not open.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <button
          className="absolute top-2 right-5 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <p className=" text-sm px-5 ">
          Merhabalar, <br /> Göndermiş olduğunuz proje dökümanında kaynak
          kısmında yer alan SVG bağlantısının bazı coinleri göstermediğini fark
          ettim. Bu nedenle, bu kaynağı kullandım: https://cryptofonts.com/icons.html; burada da bazı
          ikonlar eksik ancak eksiklikler önceki kaynaktan daha az. Proje
          gerekliliklerinden bazılarını ( unit test vb.) gerçekleştiremedim,
          özellikle coin grafiklerini oluşturamadım. Değerlendirilmeye
          alınmazsam bile, kodlardaki yanlışlıkları ve eksiklerimi öğrenebilmem
          adına bazı kısımları revize edip bana tekrar gönderirseniz çok sevinirim.
          <br />
          <p className="text-end mt-2">
            Teşekkür ederim, <br /> Beyza Nur Karadana.{" "}
          </p>
        </p>
      </div>
    </div>
  );
};

export default Modal;
