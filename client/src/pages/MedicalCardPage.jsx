import { useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import MedicalCard from "../components/MedicalCard";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";

const MedicalCardPage = () => {

  const { formData, setFormData } = useAppContext();

  const [allergyInput, setAllergyInput] = useState("");
  const [diseaseInput, setDiseaseInput] = useState("");

  const cardRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const addItem = (type) => {
    if (type === "allergies" && allergyInput) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, allergyInput],
      });
      setAllergyInput("");
    }

    if (type === "diseases" && diseaseInput) {
      setFormData({
        ...formData,
        diseases: [...formData.diseases, diseaseInput],
      });
      setDiseaseInput("");
    }
  };

  const removeItem = (type, index) => {
    if (type === "allergies") {
      const updated = formData.allergies.filter((_, i) => i !== index);
      setFormData({ ...formData, allergies: updated });
    }

    if (type === "diseases") {
      const updated = formData.diseases.filter((_, i) => i !== index);
      setFormData({ ...formData, diseases: updated });
    }
  };

  // download card
  const handleDownload = async () => {
    try {
      const element = cardRef.current;
      console.log("Element:", element);

      if (!element) return;

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 3, // high quality
      });

      const link = document.createElement("a");
      link.download = "medical-card.png";
      link.href = dataUrl;
      link.click();

    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden px-4 md:px-10 py-10" style={{ background: "linear-gradient(to bottom, #eff6ff, #ffffff)" }}>

      {/* 🔷 Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900">
          Your Medical Card
        </h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Have a look into your medical card & Download.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-8">

        {/* ================= download button ================= */}
        <div className="w-full flex justify-end">
          <div className="w-full">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 
                        bg-gradient-to-r from-blue-600 to-indigo-600 
                        text-white font-semibold 
                        px-5 py-3 rounded-xl 
                        shadow-md hover:shadow-lg 
                        hover:from-blue-700 hover:to-indigo-700 
                        transition-all duration-300"
            >
              <Download size={18} />
              Download Card
            </button>
          </div>
        </div>

        {/* ================= CARD ================= */}
        <div className="flex-1 flex justify-center">
          <div className="sticky top-24 w-full">
            <div ref={cardRef} className="inline-block w-full">
              <MedicalCard />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MedicalCardPage;