import { useBarcode } from "@createnextapp/react-barcode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/redux/store";

function Barcode({ value }: { value: string }) {
  const { inputRef } = useBarcode({
    value,
    options: {
      displayValue: false,
      background: "rgb(241 245 249)",
    },
  });

  return <canvas ref={inputRef} />;
}

function AllBarcodes() {
  const navigate = useNavigate();
  const { barcodesToPrint }: any = useSelector(
    (state: RootState) => state?.barcode
  );
  const barcodeValues = barcodesToPrint;
  setTimeout(() => {
    window?.print();
  }, 1000);
  return (
    <div>
      <div className="flex justify-between items-center h-[55px]">
        {/* <ATMPageHeading> Barcode </ATMPageHeading> */}
        <button
          onClick={() => {
            navigate("/configurations/barcode");
          }}
          className="bg-primary-main text-white rounded py-1 px-5 ml-5"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3  gap-5 py-2 px-3">
        {barcodeValues?.map((value: string, index: number) => (
          <div key={index} className={`flex flex-col gap-2 shadow relative   `}>
            <Barcode key={index} value={value} />
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AllBarcodes;
