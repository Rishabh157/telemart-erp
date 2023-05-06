import { useBarcode } from "@createnextapp/react-barcode";

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

function AllBarcodes(barcodes: any) {
  const barcodeValues = barcodes;
  console.log(barcodeValues, "hfdjfh");

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2  gap-5 py-2 px-3">
      {barcodeValues?.barcodes?.map((value: string, index: number) => (
        <div className={`flex flex-col gap-2 shadow relative   `}>
          <Barcode key={index} value={value} />
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}
export default AllBarcodes;
