import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
          gerekliliklerinden bazılarını ( JSDoc, unit test vb.) gerçekleştiremedim,
          özellikle coin grafiklerini oluşturamadım. Değerlendirilmeye
          alınmazsam bile, kodlardaki yanlışlıkları ve eksiklerimi öğrenebilmem
          adına revize edip bana tekrar gönderirseniz çok sevinirim.
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
